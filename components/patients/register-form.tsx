'use client'

import { useActionState } from 'react'
import { createPatient } from '@/actions/patient-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export function RegisterPatientForm() {
    const initialState = { message: '', errors: {} }
    const [state, dispatch, isPending] = useActionState(createPatient, initialState as any)

    return (
        <form action={dispatch}>
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Register New Patient</CardTitle>
                    <CardDescription>Enter the patient's personal and contact information.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">

                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" name="firstName" placeholder="John" required />
                        {state.errors?.firstName && <p className="text-xs text-red-500">{state.errors.firstName}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" name="lastName" placeholder="Doe" required />
                        {state.errors?.lastName && <p className="text-xs text-red-500">{state.errors.lastName}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input id="dateOfBirth" name="dateOfBirth" type="date" required />
                        {state.errors?.dateOfBirth && <p className="text-xs text-red-500">{state.errors.dateOfBirth}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="gender" value="MALE" className="accent-teal-600" defaultChecked />
                                <span className="text-sm">Male</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="gender" value="FEMALE" className="accent-teal-600" />
                                <span className="text-sm">Female</span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" placeholder="+1234567890" required />
                        {state.errors?.phone && <p className="text-xs text-red-500">{state.errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email (Optional)</Label>
                        <Input id="email" name="email" type="email" placeholder="john@example.com" />
                        {state.errors?.email && <p className="text-xs text-red-500">{state.errors.email}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" name="address" placeholder="123 Main St, City" />
                    </div>

                    <div className="md:col-span-2">
                        {state.message && <p className="text-sm font-medium text-red-500">{state.message}</p>}
                    </div>

                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>Cancel</Button>
                    <Button type="submit" className="bg-teal-600 hover:bg-teal-700">Save Patient</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
