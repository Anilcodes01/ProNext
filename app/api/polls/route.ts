
import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  try {
    const polls = await prisma.poll.findMany({
      include: {
        options: true,  
        creator: {      
          select: {
            name: true,
            avatarUrl: true,  
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
    return NextResponse.json({ message: 'Error fetching polls', error }, { status: 500 });
  }
}
