import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { postId } = await req.json();

  
  if (!postId) {
    return NextResponse.json(
      { message: "Post ID is required" },
      { status: 400 }
    );
  }

  try {
   
    await prisma.bookmark.deleteMany({
      where: { postId },
    });

    await prisma.comment.deleteMany({
      where: {postId}
    })

    
    await prisma.like.deleteMany({
      where: { postId },
    });

   
    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json(
      {
        message: "Post deleted successfully",
        deletedPost,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while deleting the post:", error);
    return NextResponse.json(
      {
        message: "Error while deleting the post",
        error
      },
      { status: 500 }
    );
  }
}
