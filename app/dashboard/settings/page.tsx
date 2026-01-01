import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileForm } from "@/components/settings/profile-form"
import { Bell } from "lucide-react"

export default async function SettingsPage() {
    const session = await auth()

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>

            <Tabs defaultValue="profile" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="clinic">Clinic Info</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <ProfileForm user={session?.user} />
                </TabsContent>

                <TabsContent value="clinic">
                    <Card>
                        <CardHeader>
                            <CardTitle>Clinic Settings</CardTitle>
                            <CardDescription>Manage general clinic information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Clinic Name</Label>
                                <Input defaultValue="General Health Clinic" />
                            </div>
                            <div className="space-y-2">
                                <Label>Address</Label>
                                <Input defaultValue="123 Medical Center Dr, Suite 100" />
                            </div>
                            <div className="space-y-2">
                                <Label>Contact Phone</Label>
                                <Input defaultValue="+1 (555) 012-3456" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Update Info</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Logs</CardTitle>
                            <CardDescription>Recent system alerts and sent messages.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { type: 'Appointment', msg: 'New appointment booked for John Doe', time: '2 mins ago' },
                                    { type: 'System', msg: 'Daily backup completed successfully', time: '1 hour ago' },
                                    { type: 'Billing', msg: 'Invoice #INV-001 generated ($150.00)', time: '3 hours ago' },
                                    { type: 'Security', msg: 'New login detected from Chrome (Windows)', time: '5 hours ago' },
                                ].map((log, i) => (
                                    <div key={i} className="flex items-start gap-4 rounded-lg border p-3">
                                        <Bell className="mt-0.5 h-4 w-4 text-teal-600" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{log.msg}</p>
                                            <p className="text-xs text-slate-500">{log.type} • {log.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
