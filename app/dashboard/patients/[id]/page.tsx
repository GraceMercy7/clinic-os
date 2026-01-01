import { getPatientById } from "@/actions/patient-details"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Calendar, FileText, CreditCard, Activity } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function PatientDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const patient = await getPatientById(id)

    if (!patient) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/patients">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">{patient.firstName} {patient.lastName}</h1>
                    <p className="text-sm text-slate-500">{patient.phone} • {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button>Book Appointment</Button>
                    <Link href={`/dashboard/patients/${patient.id}/record`}>
                        <Button variant="secondary">Add Record</Button>
                    </Link>
                    <Button variant="outline">Edit Profile</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Main Info */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-teal-600" />
                                Medical History
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {patient.medicalRecords.length === 0 ? (
                                <p className="text-sm text-slate-500">No medical records found.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {patient.medicalRecords.map((record: any) => (
                                        <li key={record.id} className="border-b pb-4 last:border-0 last:pb-0">
                                            <div className="flex justify-between">
                                                <p className="font-semibold">{record.diagnosis}</p>
                                                <p className="text-xs text-slate-400 font-medium">Dr. {record.doctor?.name || 'Staff'}</p>
                                            </div>
                                            <p className="text-sm text-slate-600">{record.treatment}</p>
                                            <p className="text-xs text-slate-400 mt-1">{new Date(record.createdAt).toLocaleDateString()}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-blue-600" />
                                Appointments
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {patient.appointments.length === 0 ? (
                                <p className="text-sm text-slate-500">No appointments found.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {patient.appointments.map((apt: any) => (
                                        <li key={apt.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                                            <div>
                                                <p className="font-medium">{new Date(apt.date).toLocaleDateString()} {new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                <p className="text-xs text-slate-500">{apt.reason || 'General Checkup'}</p>
                                            </div>
                                            <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100">{apt.status}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Patient Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div>
                                <span className="block text-slate-500">Gender</span>
                                <span className="capitalize">{patient.gender.toLowerCase()}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500">Blood Group</span>
                                <span>{patient.bloodGroup || 'Not set'}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500">Address</span>
                                <span>{patient.address || 'No address provided'}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500">Email</span>
                                <span>{patient.email || '-'}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <CreditCard className="h-4 w-4" /> Billing Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">0.00 ETB</div>
                            <p className="text-xs text-slate-500">Outstanding balance</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
