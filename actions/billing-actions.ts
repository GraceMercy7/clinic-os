'use server'

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const InvoiceSchema = z.object({
    patientId: z.string().min(1, "Patient is required"),
    amount: z.coerce.number().gt(0, "Amount must be greater than 0"),
    status: z.enum(['PENDING', 'PAID', 'CANCELLED']),
    paymentMethod: z.string().optional(),
    dueDate: z.string().optional().transform((str) => (str ? new Date(str) : undefined)),
})

export async function createInvoice(prevState: any, formData: FormData) {
    const validatedFields = InvoiceSchema.safeParse({
        patientId: formData.get('patientId') || undefined,
        amount: formData.get('amount') || undefined,
        status: formData.get('status') || undefined,
        paymentMethod: formData.get('paymentMethod') || undefined,
        dueDate: formData.get('dueDate') || undefined,
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        }
    }

    const { patientId, amount, status, paymentMethod, dueDate } = validatedFields.data

    try {
        await prisma.invoice.create({
            data: {
                patientId,
                amount,
                status,
                paymentMethod: paymentMethod || 'CASH',
                dueDate,
            },
        })
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        }
    }

    revalidatePath('/dashboard/billing')
    redirect('/dashboard/billing')
}

export async function getInvoices() {
    try {
        const invoices = await prisma.invoice.findMany({
            include: {
                patient: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
        return invoices
    } catch (error) {
        throw new Error('Failed to fetch invoices.')
    }
}
