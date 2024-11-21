
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
    const { userId, tech }: { userId: string; tech: string } = await req.json();

    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                techStack: {
                    push: tech,
                },
            },
        });

        return NextResponse.json({ message: 'Tech added successfully!', user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error adding tech stack...', error }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { tech, userId } = await req.json();

    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                techStack: {
                    set: (await prisma.user.findUnique({ where: { id: userId } }))?.techStack.filter(skill => skill !== tech) || [], 
                },
            },
        });

        return NextResponse.json({ message: 'Skill removed successfully!', user }, { status: 200 });
    } catch (error) {
        console.error("Error removing skill:", error);
        return NextResponse.json({ message: 'Failed to remove skill', error }, { status: 500 });
    }
}
