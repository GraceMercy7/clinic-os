'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const AppointmentSchema = z.object({
    patientId: z.string().min(1, "Patient is required"),
    doctorId: z.string().min(1, "Doctor is required"),
    date: z.string().transform((str) => new Date(str)), // Validates date string
    reason: z.string().optional(),
})

export async function createAppointment(prevState: any, formData: FormData) {
    const validatedFields = AppointmentSchema.safeParse({
        patientId: formData.get('patientId'),
        doctorId: formData.get('doctorId'),
        date: formData.get('date'),
        reason: formData.get('reason'),
    })

    if (!validatedFields.success) {
        console.log(validatedFields.error)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Book Appointment.',
        }
    }

    const { patientId, doctorId, date, reason } = validatedFields.data

    try {
        await prisma.appointment.create({
            data: {
                patientId,
                doctorId,
                date,
                reason,
                status: 'CONFIRMED', // Auto-confirm for demo
            },
        })
    } catch (error) {
        console.error(error)
        return {
            message: 'Database Error: Failed to Book Appointment.',
        }
    }

    revalidatePath('/dashboard/appointments')
    redirect('/dashboard/appointments')
}

export async function getAppointments() {
    try {
        const appointments = await prisma.appointment.findMany({
            include: {
                patient: true,
                doctor: true,
            },
            orderBy: {
                date: 'asc',
            }
        })
        return appointments
    } catch (error) {
        return []
    }
}

export async function getDoctors() {
    try {
        const doctors = await prisma.user.findMany({
            where: {
                OR: [
                    { role: 'DOCTOR' },
                    { role: 'ADMIN' }
                ],
                doctorProfile: { isNot: null }
            },
            include: { doctorProfile: true }
        })
        return doctors
    } catch (error) {
        return []
    }
}
