'use server'

import { prisma } from "@/lib/db"

export async function getPatientById(id: string) {
    try {
        const patient = await prisma.patient.findUnique({
            where: { id },
            include: {
                appointments: {
                    orderBy: { date: 'desc' },
                    take: 5
                },
                medicalRecords: {
                    include: { doctor: true },
                    orderBy: { createdAt: 'desc' },
                    take: 5
                },
                invoices: {
                    orderBy: { createdAt: 'desc' },
                    take: 5
                }
            }
        })
        return patient
    } catch (error) {
        console.error("Failed to fetch patient:", error)
        return null
    }
}
