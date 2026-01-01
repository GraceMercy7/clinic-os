import { getMedicalRecords } from "@/actions/record-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, FileText, User as UserIcon, Calendar } from "lucide-react"

export default async function RecordsPage() {
    const records = await getMedicalRecords()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Medical Records</h1>
                {/* 
                  Note: Usually records are created from a patient's profile, BUT 
                  if we want a general "Add Record" button here, we'd need a page that lets you select a patient.
                  For now, I'll link to patients since that's the typical flow, or disable it.
                  Let's assume we want to guide them to patient profiles.
                */}
                <Link href="/dashboard/patients">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                        <UserIcon className="mr-2 h-4 w-4" /> Go to Patients
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Records</CardTitle>
                </CardHeader>
                <CardContent>
                    {records.length === 0 ? (
                        <div className="flex h-32 items-center justify-center rounded-md border border-dashed text-sm text-slate-500">
                            No medical records found.
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {records.map((record: any) => (
                                <div key={record.id} className="flex flex-col rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between border-b pb-3 mb-3">
                                        <div className="font-semibold text-slate-900">
                                            {record.diagnosis}
                                        </div>
                                        <div className="flex items-center text-xs text-slate-500">
                                            <Calendar className="mr-1 h-3 w-3" />
                                            {new Date(record.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Patient:</span>
                                            <span className="font-medium">{record.patient.firstName} {record.patient.lastName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Doctor:</span>
                                            <span className="font-medium">{record.doctor?.name || 'Unknown'}</span>
                                        </div>
                                    </div>

                                    {record.treatment && (
                                        <div className="mt-3 rounded bg-slate-50 p-2 text-xs">
                                            <span className="font-semibold text-slate-700">Treatment:</span> {record.treatment}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
