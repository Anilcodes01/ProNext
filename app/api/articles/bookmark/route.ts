import { authOptions } from "@/app/lib/authOptions";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { articleId } = await req.json();
    const userId = session.user.id;

   
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        articleId_userId: {
          articleId,
          userId,
        },
      },
    });

    if (existingBookmark) {
      
      await prisma.bookmark.delete({
        where: {
          articleId_userId: {
            articleId,
            userId,
          },
        },
      });
      return NextResponse.json({ message: "Article unbookmarked successfully." }, { status: 200 });
    } else {
     
      const bookmark = await prisma.bookmark.create({
        data: {
          userId,
          articleId,
        },
      });
      return NextResponse.json({ message: "Bookmark added successfully.", bookmark }, { status: 200 });
    }
  } catch (error) {
    console.error("Error while bookmarking the post:", error);
    return NextResponse.json(
      {
        message: "Error while bookmarking the post.",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

  