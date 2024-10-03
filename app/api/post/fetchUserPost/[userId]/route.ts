import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;

    const userPosts = await prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,       // Include user name
            avatarUrl: true,  // Include user avatar URL (if applicable)
          },
        },
        likes: {            // Include likes
          select: {
            id: true,       // Just to indicate a like exists (can be any field)
          },
        },
        comments: {         // Include comments
          select: {
            id: true,       // Include comment ID
            content: true,  // Include comment content
            createdAt: true // Include comment creation date
          },
        },
      },
    });

    const postsWithDetails = userPosts.map(post => ({
      ...post,
      likeCount: post.likes.length,          // Calculate like count
      commentCount: post.comments.length,    // Calculate comment count
      isLiked: post.likes.length > 0,        // Determine if the post is liked
    }));

    return NextResponse.json(
      {
        message: "User-specific posts fetched successfully",
        posts: postsWithDetails, // Use 'postsWithDetails' instead of 'userPosts'
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
