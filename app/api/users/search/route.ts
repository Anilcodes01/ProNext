// app/api/search-users/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma'; // Assuming you have set up Prisma

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query || typeof query !== 'string') {
    return NextResponse.json({ error: 'Invalid search query' }, { status: 400 });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } }
        ],
      },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
