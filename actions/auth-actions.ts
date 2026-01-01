'use server'
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { prisma } from "@/lib/db"
import { z } from "zod"
import bcrypt from "bcryptjs"

const RegisterSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
})

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}

export async function registerUser(prevState: any, formData: FormData) {
    const validatedFields = RegisterSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return { message: 'Invalid fields', errors: validatedFields.error.flatten().fieldErrors }
    }

    const { name, email, password } = validatedFields.data

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'ADMIN', // Grant full access as requested
                doctorProfile: { // Create a dummy profile so they show up as a doctor if needed, or just admin
                    create: {
                        specialization: 'General',
                        availability: JSON.stringify({ mon: ['09:00-17:00'] })
                    }
                }
            }
        })
    } catch (error) {
        console.error(error)
        return { message: 'Database Error: Failed to Register.' }
    }

    // Auto-login after registration
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { message: 'Registration successful but failed to auto-login.' }
                default:
                    return { message: 'Something went wrong during auto-login.' }
            }
        }
        throw error
    }
}
