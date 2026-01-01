'use client'

import { useActionState } from 'react'
import { createAppointment } from '@/actions/appointment-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BookingForm({ patients, doctors }: { patients: any[], doctors: any[] }) {
    const initialState = { message: '', errors: {} }
    const [state, dispatch, isPending] = useActionState(createAppointment, initialState as any)

    return (
        <form action={dispatch}>
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Book Appointment</CardTitle>
                    <CardDescription>Schedule a new appointment for a patient.</CardDescription>
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
                        {state.errors?.patientId && <p className="text-xs text-red-500">{state.errors.patientId}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="doctorId">Doctor</Label>
                        <select
                            id="doctorId"
                            name="doctorId"
                            className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                            defaultValue=""
                        >
                            <option value="" disabled>Select a doctor</option>
                            {doctors.map((d) => (
                                <option key={d.id} value={d.id}>{d.name} - {d.doctorProfile?.specialization || 'General'}</option>
                            ))}
                        </select>
                        {state.errors?.doctorId && <p className="text-xs text-red-500">{state.errors.doctorId}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date">Date & Time</Label>
                        <Input id="date" name="date" type="datetime-local" required />
                        {state.errors?.date && <p className="text-xs text-red-500">{state.errors.date}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="reason">Reason for Visit</Label>
                        <Input id="reason" name="reason" placeholder="e.g. Fever, Annual Checkup" />
                    </div>

                    <div className="">
                        {state.message && <p className="text-sm font-medium text-red-500">{state.message}</p>}
                    </div>

                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>Cancel</Button>
                    <Button type="submit" className="bg-teal-600 hover:bg-teal-700">Confirm Booking</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
