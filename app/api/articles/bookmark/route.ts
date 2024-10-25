import { authOptions } from "@/app/lib/authOptions";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const session = await getServerSession(authOptions);
      
      if (!session) {
        return NextResponse.json(
          {
            message: "Unauthorized",
          },
          { status: 401 } // Changed to 401 for unauthorized access
        );
      }
  
      const { articleId } = await req.json();
  
      // Validate the articleId
      if (!articleId) {
        return NextResponse.json(
          {
            message: "Article ID is required.",
          },
          { status: 400 }
        );
      }
  
      const userId = session.user.id;
  
      // Check if the bookmark already exists
      const existingBookmark = await prisma.bookmark.findUnique({
        where: {
          articleId_userId: {
            articleId,
            userId,
          },
        },
      });
  
      if (existingBookmark) {
        return NextResponse.json(
          {
            message: "Article is already bookmarked.",
          },
          { status: 409 } // Conflict status
        );
      }
  
      // Create the bookmark in the database
      const bookmark = await prisma.bookmark.create({
        data: {
          userId,
          articleId,
        },
      });
  
      return NextResponse.json(
        {
          message: "Bookmark added successfully.",
          bookmark,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error while bookmarking the post:", error);
      return NextResponse.json(
        {
          message: "Error while bookmarking the post.",
          error: error instanceof Error ? error.message : String(error), // Log the actual error
        },
        { status: 500 }
      );
    }
  }
  