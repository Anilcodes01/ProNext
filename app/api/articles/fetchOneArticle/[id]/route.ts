import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/app/lib/authOptions";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions); 

 
    const userId = session?.user?.id || null;

  
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        user: true,
        likes: true,
        bookmarks: true, 
      },
    });

    if (!article) {
      return NextResponse.json(
        {
          message: "Article not found!",
        },
        { status: 404 }
      );
    }


    const [likedByUser, bookmarkedByUser] = await Promise.all([
      userId ? prisma.like.findUnique({
        where: {
          articleId_userId: {
            articleId: article.id,
            userId,
          },
        },
      }) : null,
      userId ? prisma.bookmark.findUnique({
        where: {
          articleId_userId: {
            articleId: article.id,
            userId,
          },
        },
      }) : null,
    ]);

  
    const likeCount = article.likes.length; 

    return NextResponse.json(
      {
        message: "Article fetched successfully!",
        article: {
          ...article,
          liked: likedByUser !== null, 
          likeCount,
          bookmarked: bookmarkedByUser !== null, 
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching article:", error); 
    return NextResponse.json(
      {
        message: "Error while fetching article!",
        error: error instanceof Error ? error.message : String(error), 
      },
      { status: 500 }
    );
  }
}
