
import { NextResponse } from 'next/server';
import { prisma } from "@/app/lib/prisma"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { optionId } = await request.json();

  try {
    const vote = await prisma.pollVote.create({
      data: {
        userId: session.user.id,
        optionId,
      },
    });

    return NextResponse.json(vote);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to submit vote', error }, { status: 500 });
  }
}
