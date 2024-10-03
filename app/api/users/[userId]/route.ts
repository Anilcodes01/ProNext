// app/api/users/[userId]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma'; // Adjust the import path as needed

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    // Fetch the user details from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        avatarUrl: true,
        createdAt: true, 
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'User fetched successfully', user },
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