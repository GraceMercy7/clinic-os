'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { auth } from "@/auth"

const RecordSchema = z.object({
    patientId: z.string().min(1, "Patient ID is required"),
    diagnosis: z.string().min(2, "Diagnosis is required"),
    treatment: z.string().optional(),
    prescription: z.string().optional(),
    notes: z.string().optional(),
})

export async function createMedicalRecord(prevState: any, formData: FormData) {
    const session = await auth()

    if (!session?.user?.id) {
        return { message: 'Unauthorized: You must be logged in to add records.' }
    }

    // Ideally checkout if user is DOCTOR
    // if (session.user.role !== 'DOCTOR') ...

    const validatedFields = RecordSchema.safeParse({
        patientId: formData.get('patientId'),
        diagnosis: formData.get('diagnosis'),
        treatment: formData.get('treatment'),
        prescription: formData.get('prescription'),
        notes: formData.get('notes'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Record.',
        }
    }

    const { patientId, diagnosis, treatment, prescription, notes } = validatedFields.data

    try {
        await prisma.medicalRecord.create({
            data: {
                patientId,
                doctorId: session.user.id, // Current logged in doctor
                diagnosis,
                treatment,
                prescription,
                notes,
            },
        })
    } catch (error) {
        console.error(error)
        return {
            message: 'Database Error: Failed to Create Record.',
        }
    }

    revalidatePath(`/dashboard/patients/${patientId}`)
    redirect(`/dashboard/patients/${patientId}`)
}

export async function getMedicalRecords() {
    try {
        const records = await prisma.medicalRecord.findMany({
            include: {
                patient: true,
                doctor: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
        return records
    } catch (error) {
        throw new Error('Failed to fetch medical records.')
    }
}
