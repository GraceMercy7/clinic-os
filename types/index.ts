export type Role = 'ADMIN' | 'DOCTOR' | 'NURSE' | 'RECEPTIONIST' | 'STAFF'

export interface SidebarItem {
    title: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    roles?: Role[]
}

export interface Patient {
    id: string
    firstName: string
    lastName: string
    email?: string | null
    phone: string
    dateOfBirth: Date
    gender: string
    address?: string | null
    bloodGroup?: string | null
    allergies?: string | null
    createdAt: Date
    updatedAt: Date

    appointments?: Appointment[]
    medicalRecords?: MedicalRecord[]
    invoices?: Invoice[]
}

export interface Appointment {
    id: string
    patientId: string
    doctorId: string
    date: Date
    status: string
    reason?: string | null
    notes?: string | null
    createdAt: Date
    updatedAt: Date

    patient?: Patient
    doctor?: User
}

export interface MedicalRecord {
    id: string
    patientId: string
    doctorId: string
    diagnosis: string
    treatment?: string | null
    prescription?: string | null
    notes?: string | null
    createdAt: Date
    updatedAt: Date
}

export interface Invoice {
    id: string
    amount: number
    status: string
    createdAt: Date
}

export interface User {
    id: string
    name?: string | null
    email?: string | null
    role: string
}
