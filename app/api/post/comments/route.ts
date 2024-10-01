import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { postId, userId, content } = await req.json();

  try {
    const comment = await prisma.comment.create({
      data: {
        postId,
        userId,
        content,
      
      },
      
      
    });

    return NextResponse.json(
      {
        message: "Comment added successfully!",
        comment,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while commenting the post...",
        error,
      },
      { status: 500 }
    );
  }
}
