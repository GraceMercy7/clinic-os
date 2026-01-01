'use client'

import { useActionState } from 'react'
import { createInvoice } from '@/actions/billing-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export function CreateInvoiceForm({ patients }: { patients: any[] }) {
    const initialState = { message: '', errors: {} }
    const [state, dispatch, isPending] = useActionState(createInvoice, initialState as any)

    return (
        <form action={dispatch}>
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Generate Invoice</CardTitle>
                    <CardDescription>Create a new bill for a patient.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">

                    <div className="space-y-2">
                        <Label htmlFor="patientId">Patient</Label>
                        <div className="relative">
                            <select
                                id="patientId"
                                name="patientId"
                                className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                                defaultValue=""
                            >
                                <option value="" disabled>Select a patient</option>
                                {patients.map((p) => (
                                    <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount (ETB)</Label>
                        <Input id="amount" name="amount" type="number" step="0.01" placeholder="0.00" required />
                        {state.errors?.amount && <p className="text-xs text-red-500">{state.errors.amount}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <select
                            id="status"
                            name="status"
                            className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            defaultValue="PENDING"
                        >
                            <option value="PENDING">Pending</option>
                            <option value="PAID">Paid</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input id="dueDate" name="dueDate" type="date" />
                    </div>

                    <div className="">
                        {state.message && <p className="text-sm font-medium text-red-500">{state.message}</p>}
                    </div>

                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>Cancel</Button>
                    <Button type="submit" className="bg-teal-600 hover:bg-teal-700">Create Invoice</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
