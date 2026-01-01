'use client'

import { useActionState } from 'react'
import { createMedicalRecord } from '@/actions/record-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export function RecordForm({ patientId, patientName }: { patientId: string, patientName: string }) {
    const initialState = { message: '', errors: {} }
    const [state, dispatch, isPending] = useActionState(createMedicalRecord, initialState as any)

    return (
        <form action={dispatch}>
            <input type="hidden" name="patientId" value={patientId} />
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Add Medical Record</CardTitle>
                    <CardDescription>New consultation record for <span className="font-semibold text-slate-900">{patientName}</span>.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">

                    <div className="space-y-2">
                        <Label htmlFor="diagnosis">Diagnosis</Label>
                        <Input id="diagnosis" name="diagnosis" placeholder="e.g. Acute Bronchitis" required />
                        {state.errors?.diagnosis && <p className="text-xs text-red-500">{state.errors.diagnosis}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="treatment">Treatment Plan</Label>
                        <Textarea id="treatment" name="treatment" placeholder="Rest, hydration..." />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="prescription">Prescription</Label>
                        <Textarea id="prescription" name="prescription" placeholder="Amoxicillin 500mg, 3x daily" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Doctor's Notes</Label>
                        <Textarea id="notes" name="notes" placeholder="Patient complained of..." />
                    </div>

                    <div className="">
                        {state.message && <p className="text-sm font-medium text-red-500">{state.message}</p>}
                    </div>

                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>Cancel</Button>
                    <Button type="submit" className="bg-teal-600 hover:bg-teal-700">Save Record</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
