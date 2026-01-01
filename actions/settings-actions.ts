'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const ProfileSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
})

export async function updateProfile(prevState: any, formData: FormData) {
    const session = await auth()
    if (!session?.user?.id) return { message: 'Unauthorized' }

    const validatedFields = ProfileSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Failed to Update Profile.',
        }
    }

    const { name, email } = validatedFields.data

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: { name, email }
        })
    } catch (error) {
        return { message: 'Database Error: Failed to Update Profile' }
    }

    revalidatePath('/dashboard/settings')
    return { message: 'Profile updated successfully!', success: true }
}
