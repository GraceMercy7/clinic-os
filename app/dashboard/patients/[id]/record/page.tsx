import { RecordForm } from "@/components/records/record-form"
import { getPatientById } from "@/actions/patient-details"
import { notFound } from "next/navigation"

export default async function AddRecordPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const patient = await getPatientById(id)

    if (!patient) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto py-6">
            <RecordForm patientId={patient.id} patientName={`${patient.firstName} ${patient.lastName}`} />
        </div>
    )
}
