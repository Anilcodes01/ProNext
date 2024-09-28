import { NextResponse } from "next/server";
import {prisma} from "@/app/lib/prisma"; // Update path as needed

export async function POST(req: Request) {
  try {
    const { postId, userId } = await req.json();

    // Check if the user has already liked this post
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existingLike) {
      return NextResponse.json({ message: "Post already liked" }, { status: 400 });
    }

    // Create a new like if it doesn't exist
    const like = await prisma.like.create({
      data: {
        post: { connect: { id: postId } },
        user: { connect: { id: userId } },
      },
    });

    return NextResponse.json(like);
  } catch (error) {
    console.error("Error liking post:", error);
    return NextResponse.json({ error: "Failed to like post" }, { status: 500 });
  }
}
