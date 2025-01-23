import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {articleId} = await req.json();

  if (!articleId) {
    return NextResponse.json(
      {
        message: "Article ID is required",
      },
      { status: 400 }
    );
  }

  try {
    await prisma.bookmark.deleteMany({
      where: { articleId },
    });

    await prisma.like.deleteMany({
      where: { articleId },
    });

    const deletedArticle = await prisma.article.delete({
      where: { id: articleId },
    });

    return NextResponse.json(
      {
        message: "Article deleted successfully...!",
        deletedArticle
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
       
      { message: "Error while deleting article", error },
      { status: 500 }
    );
  }
}
