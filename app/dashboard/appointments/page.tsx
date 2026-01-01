import { getAppointments } from "@/actions/appointment-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, Calendar, Clock, User as UserIcon } from "lucide-react"

export default async function AppointmentsPage() {
    const appointments = await getAppointments()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Appointments</h1>
                <Link href="/dashboard/appointments/book">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                        <Plus className="mr-2 h-4 w-4" /> Book Appointment
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                    {appointments.length === 0 ? (
                        <div className="flex h-32 items-center justify-center rounded-md border border-dashed text-sm text-slate-500">
                            No appointments scheduled.
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {appointments.map((apt: any) => (
                                <div key={apt.id} className="flex flex-col rounded-lg border bg-white p-4 shadow-sm">
                                    <div className="flex items-center justify-between border-b pb-3">
                                        <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                                            <Calendar className="h-4 w-4 text-teal-600" />
                                            {new Date(apt.date).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                                            <Clock className="h-4 w-4 text-teal-600" />
                                            {new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                    <div className="mt-3 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <UserIcon className="h-4 w-4 text-slate-500" />
                                            <span className="text-sm font-medium">{apt.patient.firstName} {apt.patient.lastName}</span>
                                        </div>
                                        <div className="text-xs text-slate-500 pl-6">
                                            Dr. {apt.doctor.name}
                                        </div>
                                        <div className="mt-2 rounded bg-slate-100 p-2 text-xs text-slate-600">
                                            {apt.reason || 'No reason provided'}
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                            {apt.status}
                                        </span>
                                        <Button variant="ghost" size="sm" className="h-8 text-xs">Details</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
