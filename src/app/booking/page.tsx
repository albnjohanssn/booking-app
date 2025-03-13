import React from 'react'
import { PrismaClient } from '@prisma/client'
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from 'next/navigation';

const prisma = new PrismaClient()

export default async function page() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    console.log(session);

    if (!session) {
        redirect('/login')
    }

    const booking = await prisma.booking.findMany({})
    console.log(booking);

    async function handleSubmit(formData: FormData) {
        'use server'
        const resource = formData.get('resource') as string
        const start = formData.get('start') as string
        const end = formData.get('end') as string
        const data = await prisma.booking.create({
            data: {
                userId: session?.user.id as string,
                startTime: start,
                endTime: end,
                resourceId: resource
            }
        })
        console.log('Created booking:', data);
    }

    return (
        <div>
            <h1>All Bookings:</h1>
            <form action={handleSubmit}>
                <input type="text" name='resource' placeholder='Resource Id' />
                <input type="text" name='start' placeholder='Start Time' />
                <input type="text" name='end' placeholder='End Time' />
                <button>Create</button>
            </form>
        </div>
    )
}
