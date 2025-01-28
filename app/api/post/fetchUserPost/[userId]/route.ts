import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    const userPosts = await prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            avatarUrl: true,
            username: true,
          },
        },
        likes: {
          select: {
            id: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
          },
        },
      },
    });

    const postsWithDetails = userPosts.map((post) => ({
      ...post,
      likeCount: post.likes.length,
      commentCount: post.comments.length,
      isLiked: post.likes.length > 0,
    }));

    return NextResponse.json(
      {
        message: "User-specific posts fetched successfully",
        posts: postsWithDetails,
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
