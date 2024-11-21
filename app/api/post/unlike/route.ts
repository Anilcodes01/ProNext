
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function POST(req: Request) {
    try {
      const { postId, userId } = await req.json();
      console.log('Received postId:', postId, 'userId:', userId); 
  
      if (!postId || !userId) {
        return NextResponse.json({ error: 'Missing postId or userId' }, { status: 400 });
      }
  
      const result = await prisma.like.deleteMany({
        where: {
          postId,
          userId
        }
      });
  
     
      console.log('Deleted likes count:', result.count);
  
      return NextResponse.json({ message: 'Post unliked' }, { status: 200 });
    } catch (error) {
      console.error('Error unliking post:', error);
      return NextResponse.json({ error: 'Failed to unlike the post' }, { status: 500 });
    }
  }
  
