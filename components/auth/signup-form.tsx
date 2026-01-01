'use client'
import { useActionState } from 'react'
import { registerUser } from '@/actions/auth-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import Link from 'next/link'

export function SignupForm() {
    const [state, dispatch, isPending] = useActionState(registerUser, undefined)

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Sign up to get full access to the clinic system.</CardDescription>
            </CardHeader>
            <form action={dispatch}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" placeholder="John Doe" required />
                        {state?.errors?.name && <p className="text-xs text-red-500">{state.errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                        {state?.errors?.email && <p className="text-xs text-red-500">{state.errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required minLength={6} />
                        {state?.errors?.password && <p className="text-xs text-red-500">{state.errors.password}</p>}
                    </div>
                    {state?.message && <p className="text-sm text-red-500">{state.message}</p>}
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                    <div className="text-sm text-center text-slate-500">
                        Already have an account? <Link href="/login" className="text-teal-600 hover:underline">Log in</Link>
                    </div>
                </CardFooter>
            </form>
        </Card>
    )
}
