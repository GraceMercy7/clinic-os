import { getInvoices } from "@/actions/billing-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus, DollarSign, FileText } from "lucide-react"

export default async function BillingPage() {
    const invoices = await getInvoices()

    const totalRevenue = invoices
        .filter((i: any) => i.status === 'PAID')
        .reduce((acc: number, curr: any) => acc + curr.amount, 0)

    const pendingAmount = invoices
        .filter((i: any) => i.status === 'PENDING')
        .reduce((acc: number, curr: any) => acc + curr.amount, 0)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Billing & Invoicing</h1>
                <Link href="/dashboard/billing/create">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                        <Plus className="mr-2 h-4 w-4" /> Create Invoice
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalRevenue.toFixed(2)} ETB</div>
                        <p className="text-xs text-muted-foreground">Lifetime collected</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingAmount.toFixed(2)} ETB</div>
                        <p className="text-xs text-muted-foreground">Awaiting payment</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                    {invoices.length === 0 ? (
                        <div className="flex h-32 items-center justify-center rounded-md border border-dashed text-sm text-slate-500">
                            No invoices found.
                        </div>
                    ) : (
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-slate-50/50 data-[state=selected]:bg-slate-50">
                                        <th className="h-12 px-4 align-middle font-medium text-slate-500">Invoice ID</th>
                                        <th className="h-12 px-4 align-middle font-medium text-slate-500">Patient</th>
                                        <th className="h-12 px-4 align-middle font-medium text-slate-500">Amount</th>
                                        <th className="h-12 px-4 align-middle font-medium text-slate-500">Status</th>
                                        <th className="h-12 px-4 align-middle font-medium text-slate-500">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {invoices.map((inv: any) => (
                                        <tr key={inv.id} className="border-b transition-colors hover:bg-slate-50">
                                            <td className="p-4 align-middle font-medium">#{inv.id.slice(-6).toUpperCase()}</td>
                                            <td className="p-4 align-middle">{inv.patient.firstName} {inv.patient.lastName}</td>
                                            <td className="p-4 align-middle font-bold">{inv.amount.toFixed(2)} ETB</td>
                                            <td className="p-4 align-middle">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${inv.status === 'PAID' ? 'bg-green-100 text-green-800' :
                                                    inv.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {inv.status}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle text-slate-500">{new Date(inv.createdAt).toLocaleDateString()}</td>
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
