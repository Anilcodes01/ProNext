import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; // Assuming you're using NextAuth for session handling
import { authOptions } from "@/app/lib/authOptions"; // Import your NextAuth options

export const revalidate = 0;

export async function GET() {
  try {
    const session = await getServerSession(authOptions); // Get the session
    const userId = session?.user?.id; // Get the logged-in user ID

    const getPosts = await prisma.post.findMany({
      select: {
        id: true,
        content: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        user: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
        // Include likes to check if the current user has liked the post
        likes: {
          where: {
            userId: userId, // Filter likes by the current user
          },
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true, // Count total likes for each post
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Map through the posts and add a 'liked' field
    const postsWithLikeStatus = getPosts.map((post) => ({
      ...post,
      liked: post.likes.length > 0, // If the user has liked the post, mark as liked
      likeCount: post._count.likes, // Total like count
    }));

    return NextResponse.json(
      {
        message: "Posts fetched successfully!",
        posts: postsWithLikeStatus, // Return posts with like status
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      {
        message: "Error while fetching posts!",
      },
      { status: 500 }
    );
  }
}
