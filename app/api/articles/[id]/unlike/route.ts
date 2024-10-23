import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma'; // Adjust this path to where your Prisma client is set up
import { getServerSession } from 'next-auth'; // Adjust this to your session logic
import { authOptions } from '@/app/lib/authOptions';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions); // Assuming you are using some session/auth logic

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const articleId = params.id;

  try {
    // Check if user has already liked the article
    const existingLike = await prisma.like.findUnique({
      where: { articleId_userId: { articleId, userId } },
    });

    if (!existingLike) {
      return NextResponse.json({ message: 'You haven\'t liked this article yet.' }, { status: 400 });
    }

    // Delete the like
    await prisma.like.delete({
      where: { articleId_userId: { articleId, userId } },
    });

    return NextResponse.json({ message: 'Article unliked successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error while unliking the article", error }, { status: 500 });
  }
}
