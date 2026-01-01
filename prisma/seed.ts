import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create Admin User
    const admin = await prisma.user.upsert({
        where: { email: 'admin@clinic.com' },
        update: {},
        create: {
            email: 'admin@clinic.com',
            name: 'System Admin',
            role: 'ADMIN',
        },
    })

    // Create Mock Doctor
    const doctor = await prisma.user.upsert({
        where: { email: 'doctor@clinic.com' },
        update: {},
        create: {
            email: 'doctor@clinic.com',
            name: 'Dr. John Doe',
            role: 'DOCTOR',
            doctorProfile: {
                create: {
                    specialization: 'General Practitioner',
                    availability: JSON.stringify({ mon: ['09:00-17:00'] }),
                }
            }
        },
    })

    console.log({ admin, doctor })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
