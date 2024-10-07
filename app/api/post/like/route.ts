import { NextResponse } from "next/server";
import {prisma} from "@/app/lib/prisma"; 

export async function POST(req: Request) {
  try {
    const { postId, userId } = await req.json();

    
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
