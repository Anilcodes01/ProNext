import { authOptions } from "@/app/lib/authOptions";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthenticated...!",
        },
        { status: 400 }
      );
    }

    const allArticleIds = await prisma.article.findMany({
      select: {
        id: true,
      },
    });

    if (allArticleIds.length === 0) {
      return NextResponse.json(
        {
          message: "No articles found",
          articles: [],
        },
        { status: 200 }
      );
    }

    const selectedIndices = new Set<number>();
    while (
      selectedIndices.size < 2 &&
      selectedIndices.size < allArticleIds.length
    ) {
      const randomIndex = Math.floor(Math.random() * allArticleIds.length);
      selectedIndices.add(randomIndex);
    }

    const selectedIds = Array.from(selectedIndices).map(
      (index) => allArticleIds[index].id
    );

    const randomArticles = await prisma.article.findMany({
      where: {
        id: {
          in: selectedIds,
        },
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    const shuffledArticles = randomArticles.sort(() => Math.random() - 0.5);

    return NextResponse.json(
      {
        articles: shuffledArticles,
        message: "Articles fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching random articles:", error);
    return NextResponse.json(
      {
        message: "Error fetching articles",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
