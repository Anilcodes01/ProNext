import { authOptions } from "@/app/lib/authOptions";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Fetch bookmarked articles
    const bookmarkedArticles = await prisma.bookmark.findMany({
      where: {
        userId: userId,
      },
      select: {
        articleId: true, 
      },
    });

    const articleIds = bookmarkedArticles
      .map((bookmark) => bookmark.articleId)
      .filter((id): id is string => id !== null); 

    // Fetch article details
    const articles = await prisma.article.findMany({
      where: {
        id: { in: articleIds },
      },
      include: {
        user: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
        _count: {
          select: {
            likes: true,
            
          },
        },
        likes: true,
        bookmarks: {
          where: {
            userId: userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', 
      },
    });

    // Transform the articles data
    const transformedArticles = articles.map((article) => {
      return {
        ...article,
        isLiked: article.likes.length > 0,
        isBookmarked: article.bookmarks.length > 0,
        likeCount: article._count.likes,
        
      };
    });

    return NextResponse.json(
      {
        message: "Bookmarked articles fetched successfully!",
        articles: transformedArticles,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while fetching bookmarks...",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
