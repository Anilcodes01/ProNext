import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;

    const userPosts = await prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: true, // Include user details if needed in the response
      },
    });

    return NextResponse.json(
      {
        message: "User-specific posts fetched successfully",
        posts: userPosts, // Use 'posts' instead of 'userPosts'
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while fetching user posts...",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
