

import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma'; 

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        createdAt: true, 
        bio: true,
        website: true,
        city: true,
        techStack: true,
        ProfilePageImage: true
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Fetch the followers count (users following this user)
    const followersCount = await prisma.follow.count({
      where: { followingId: userId },
    });

    // Fetch the following count (users this user is following)
    const followingCount = await prisma.follow.count({
      where: { followerId: userId },
    });

    return NextResponse.json(
      {
        message: 'User fetched successfully',
        user,
        followersCount,
        followingCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: 'Error fetching user data', error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
