import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { message: "Post ID is required" },
      { status: 400 }
    );
  }

  try {
   
    await prisma.bookmark.deleteMany({
      where: { userId },
    });
    

    await prisma.comment.deleteMany({
      where: { userId },
    });

    await prisma.like.deleteMany({
      where: { userId },
    });
    await prisma.article.deleteMany({
      where: { userId },
    });

    await prisma.post.deleteMany({
      where: {  userId },
    });

    await prisma.comment.deleteMany({
      where: { userId },
    });

     await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      {
        message: "User deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while deleting the post:", error);
    return NextResponse.json(
      {
        message: "Error while deleting the post",
        error,
      },
      { status: 500 }
    );
  }
}
