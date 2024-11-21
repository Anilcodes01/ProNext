import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"; 

export async function POST(request: Request) {
  try {
    const { postId, userId, content } = await request.json();

    const newComment = await prisma.comment.create({
      data: {
        content,
        post: { connect: { id: postId } },
        user: { connect: { id: userId } },
      },
      include: { user: true },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to add comment" , error}, { status: 500 });
  }
}
