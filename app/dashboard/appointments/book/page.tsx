import { BookingForm } from "@/components/appointments/booking-form"
import { getPatients } from "@/actions/patient-actions"
import { getDoctors } from "@/actions/appointment-actions"

export default async function BookingPage() {
    const patients = await getPatients('')
    const doctors = await getDoctors()

    return (
        <div className="max-w-4xl mx-auto py-6">
            <BookingForm patients={patients} doctors={doctors} />
        </div>
    )
}
