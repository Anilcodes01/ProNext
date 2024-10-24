import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; // Adjust this import based on your auth setup
import { authOptions } from "@/app/lib/authOptions"; // Adjust the path based on your project structure

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions); // Get session to retrieve the user ID

    // Check if the user is logged in and safely access the user ID
    const userId = session?.user?.id || null;

    // Fetch the article with associated user data and count likes directly
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        user: true,
        likes: true,
        bookmarks: true, // Include bookmarks if needed later
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

    // Check if the article is liked and bookmarked by the logged-in user
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

    // Count total likes
    const likeCount = article.likes.length; // Get total likes count

    return NextResponse.json(
      {
        message: "Article fetched successfully!",
        article: {
          ...article,
          liked: likedByUser !== null, // true if liked, false otherwise
          likeCount,
          bookmarked: bookmarkedByUser !== null, // true if bookmarked, false otherwise
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching article:", error); // Log the error for debugging
    return NextResponse.json(
      {
        message: "Error while fetching article!",
        error: error instanceof Error ? error.message : String(error), // Send a stringified error message
      },
      { status: 500 }
    );
  }
}
