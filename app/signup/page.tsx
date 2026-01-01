import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-sm">
                <div className="flex flex-col items-center gap-2 mb-6">
                    <div className="h-8 w-8 rounded bg-teal-600"></div>
                    <h1 className="text-xl font-semibold text-slate-900">Clinic OS</h1>
                </div>
                <SignupForm />
            </div>
        </div>
    )
}
