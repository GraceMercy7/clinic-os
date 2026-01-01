import { CreateInvoiceForm } from "@/components/billing/invoice-form"
import { getPatients } from "@/actions/patient-actions"

export default async function CreateInvoicePage() {
    const patients = await getPatients('')

    return (
        <div className="max-w-4xl mx-auto py-6">
            <CreateInvoiceForm patients={patients} />
        </div>
    )
}
