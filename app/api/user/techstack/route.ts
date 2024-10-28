import {prisma} from '@/app/lib/prisma'
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

    const {userId, tech}: {userId: string, tech: string} = await req.json();

    try {
        const user = await prisma.user.update({
            where: {id: userId},
            data: {
                techStack: {
                    push: tech
                }
            }
        })

        return NextResponse.json({
            message: 'Tech added successfully!',
            user
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            message: 'Error adding tech stack...',
            error
        }, {status: 500})
    }
}