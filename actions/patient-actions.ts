'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const PatientSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email().optional().or(z.literal('')),
    phone: z.string().min(10, "Phone number is required"),
    dateOfBirth: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', { message: 'A valid date of birth is required.' }).transform((str) => new Date(str)),
    gender: z.string(),
    address: z.string().optional(),
})

export async function createPatient(prevState: any, formData: FormData) {
    const validatedFields = PatientSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        dateOfBirth: formData.get('dateOfBirth'),
        gender: formData.get('gender'),
        address: formData.get('address'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Register Patient.',
        }
    }

    const { firstName, lastName, email, phone, dateOfBirth, gender, address } = validatedFields.data

    try {
        await prisma.patient.create({
            data: {
                firstName,
                lastName,
                email: email || null,
                phone,
                dateOfBirth,
                gender,
                address: address || null,
            },
        })
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Patient.',
        }
    }

    revalidatePath('/dashboard/patients')
    redirect('/dashboard/patients')
}

export async function getPatients(query: string) {
    try {
        const patients = await prisma.patient.findMany({
            where: {
                OR: [
                    { firstName: { contains: query } }, // Case insensitive in SQLite is default for ASCII, but usually needs logic in code if sensitive
                    { lastName: { contains: query } },
                    { phone: { contains: query } },
                ],
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
        return patients
    } catch (error) {
        throw new Error('Failed to fetch patients.')
    }
}
