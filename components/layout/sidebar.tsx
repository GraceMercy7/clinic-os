'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Users, Calendar, FileText, Settings, LayoutDashboard, CreditCard } from 'lucide-react'

const sidebarItems = [
    { title: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { title: 'Patients', href: '/dashboard/patients', icon: Users },
    { title: 'Appointments', href: '/dashboard/appointments', icon: Calendar },
    { title: 'Records', href: '/dashboard/records', icon: FileText },
    { title: 'Billing', href: '/dashboard/billing', icon: CreditCard },
    { title: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()
    return (
        <aside className="hidden h-screen w-64 flex-col border-r bg-slate-900 text-slate-50 md:flex">
            <div className="flex h-16 items-center border-b border-slate-800 px-6">
                <span className="text-lg font-bold">Clinic OS</span>
            </div>
            <nav className="flex-1 space-y-1 p-4">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white",
                            pathname === item.href ? "bg-slate-800 text-white" : "text-slate-400"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}
