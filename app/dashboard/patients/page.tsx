import { getPatients } from "@/actions/patient-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Plus, Search } from "lucide-react"

export default async function PatientsPage({
    searchParams,
}: {
    searchParams: Promise<{
        query?: string
        page?: string
    }>
}) {
    const sp = await searchParams
    const query = sp?.query || ''
    const patients = await getPatients(query)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Patients</h1>
                <Link href="/dashboard/patients/register">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                        <Plus className="mr-2 h-4 w-4" /> Register Patient
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Patient Directory</CardTitle>
                    <div className="flex w-full max-w-sm items-center space-x-2 pt-4">
                        <div className="relative w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                            <Input
                                type="search"
                                placeholder="Search by name or phone..."
                                className="pl-9"
                                // In a real app we'd attach a client component to update URL params
                                defaultValue={query}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {patients.length === 0 ? (
                        <div className="flex h-32 items-center justify-center rounded-md border border-dashed text-sm text-slate-500">
                            No patients found.
                        </div>
                    ) : (
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-slate-50/50 data-[state=selected]:bg-slate-50">
                                        <th className="h-12 px-4 align-middle font-medium text-slate-500">Name</th>
                                        <th className="h-12 px-4 align-middle font-medium text-slate-500">Gender</th>
                                        <th className="h-12 px-4 align-middle font-medium text-slate-500">Age</th>
                                        <th className="h-12 px-4 align-middle font-medium text-slate-500">Contact</th>
                                        <th className="h-12 px-4 align-middle font-medium text-slate-500 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {patients.map((patient: any) => (
                                        <tr key={patient.id} className="border-b transition-colors hover:bg-slate-50">
                                            <td className="p-4 align-middle font-medium">
                                                {patient.firstName} {patient.lastName}
                                            </td>
                                            <td className="p-4 align-middle capitalize">{patient.gender.toLowerCase()}</td>
                                            <td className="p-4 align-middle">
                                                {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()}
                                            </td>
                                            <td className="p-4 align-middle">{patient.phone}</td>
                                            <td className="p-4 align-middle text-right">
                                                <Link href={`/dashboard/patients/${patient.id}`}>
                                                    <Button variant="outline" size="sm">View</Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
