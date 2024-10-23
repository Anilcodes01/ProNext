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

    // Check if the user is logged in
    const userId = session?.user?.id; // Ensure user ID is safely accessed

    // Fetch the article with associated user data
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        user: true,
        likes: true, // Include likes to count total likes
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

    // Check if the article is liked by the logged-in user
    const likedByUser = userId ? await prisma.like.findUnique({
      where: {
        articleId_userId: {
          articleId: article.id,
          userId: userId,
        },
      },
    }) : null;

    // Count total likes
    const likeCount = article.likes.length; // Get total likes count

    return NextResponse.json(
      {
        message: "Article fetched successfully!",
        article: {
          ...article,
          liked: likedByUser !== null, // true if liked, false otherwise
          likeCount: likeCount, // total like count
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while fetching article!",
        error,
      },
      { status: 500 }
    );
  }
}
