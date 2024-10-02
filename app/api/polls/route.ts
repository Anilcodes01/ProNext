// app/api/polls/route.ts
import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const polls = await prisma.poll.findMany({
      include: {
        options: true,  // Include poll options
        creator: {       // Include the creator (user) information
          select: {
            name: true,
            avatarUrl: true,  // Assuming avatar is stored in the 'image' field
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(polls);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching polls' }, { status: 500 });
  }
}
