import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"; // Adjust the path to your Prisma client

// The GET method for fetching a single post by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Fetch the post by ID from the database using Prisma
    const post = await prisma.post.findUnique({
      where: { id: String(id) },
      include: {
        user: {  // Fetch user details
          select: {
            name: true,
            avatarUrl: true,
          },
        },
        likes: true, // Fetch likes to calculate like count
        comments: {  // Fetch comments with user details
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
              select: {
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    // If the post is not found, return a 404 response
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Return the post data along with like count and comments
    return NextResponse.json({
      ...post,
      likeCount: post.likes.length,  // Calculate like count
      comments: post.comments,  // Return comments
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
