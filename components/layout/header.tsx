import { Button } from "@/components/ui/button"

export function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-8 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Dashboard</h2>
            <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">Log out</Button>
            </div>
        </header>
    )
}
