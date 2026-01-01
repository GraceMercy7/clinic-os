'use client'

import { useActionState } from 'react'
import { updateProfile } from "@/actions/settings-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield } from "lucide-react"

export function ProfileForm({ user }: { user: any }) {
    const initialState = { message: '', errors: {} }
    const [state, dispatch, isPending] = useActionState(updateProfile, initialState as any)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details.</CardDescription>
            </CardHeader>
            <form action={dispatch}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" defaultValue={user?.name || ''} />
                        {state.errors?.name && <p className="text-xs text-red-500">{state.errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" defaultValue={user?.email || ''} readOnly className="bg-slate-50" />
                        <p className="text-xs text-slate-500">Email updates are disabled for this demo.</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Role</Label>
                        <div className="flex items-center gap-2 rounded-md border p-3 bg-slate-50">
                            <Shield className="h-4 w-4 text-slate-500" />
                            <span className="text-sm font-medium">{user?.role || 'STAFF'}</span>
                        </div>
                    </div>
                    <div className="">
                        {state.message && <p className={`text-sm font-medium ${state.success ? 'text-green-600' : 'text-red-500'}`}>{state.message}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Save Changes</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
