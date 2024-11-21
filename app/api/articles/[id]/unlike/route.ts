import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma'; 
import { getServerSession } from 'next-auth'; 
import { authOptions } from '@/app/lib/authOptions';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions); 

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const articleId = params.id;

  try {
   
    const existingLike = await prisma.like.findUnique({
      where: { articleId_userId: { articleId, userId } },
    });

    if (!existingLike) {
      return NextResponse.json({ message: 'You haven\'t liked this article yet.' }, { status: 400 });
    }

    
    await prisma.like.delete({
      where: { articleId_userId: { articleId, userId } },
    });

    return NextResponse.json({ message: 'Article unliked successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error while unliking the article", error }, { status: 500 });
  }
}
