// app/api/polls/create/route.ts
import { NextResponse } from 'next/server';
import { prisma } from "@/app/lib/prisma"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();
  const { question, options } = data;

  if (!question || options.length < 2) {
    return NextResponse.json({ error: 'Invalid poll data' }, { status: 400 });
  }

  try {
    const poll = await prisma.poll.create({
      data: {
        question,
        creatorId: session.user.id,
        options: {
          create: options.map((optionText: string) => ({
            text: optionText,
          })),
        },
      },
      include: {
        options: true,
      },
    });

    return NextResponse.json(poll);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create poll' }, { status: 500 });
  }
}
