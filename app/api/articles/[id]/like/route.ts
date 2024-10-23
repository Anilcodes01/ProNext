import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const articleId = params.id;

  try {
    // Check if the user has already liked the article
    const existingLike = await prisma.like.findUnique({
      where: {
        articleId_userId: {
          articleId,
          userId,
        },
      },
    });

    if (existingLike) {
      // If a like exists, delete it (unlike)
      await prisma.like.delete({
        where: {
          articleId_userId: {
            articleId,
            userId,
          },
        },
      });

      return NextResponse.json({ message: 'Article unliked successfully', liked: false }, { status: 200 });
    } else {
      // If no like exists, create a new like
      await prisma.like.create({
        data: {
          articleId,
          userId,
        },
      });

      return NextResponse.json({ message: 'Article liked successfully', liked: true,  }, { status: 201 });
    }
  } catch (error: any) {
    // Handle Prisma P2025 error specifically for 'Record to delete does not exist'
    if (error.code === 'P2025') {
      return NextResponse.json({ message: 'Like not found, cannot unlike' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Error while toggling like', error }, { status: 500 });
  }
}
