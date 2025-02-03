import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const getArticles = await prisma.article.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        message: "Articles fetched successfully!",
       articles: getArticles,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while fetching articles...",
        error,
      },
      { status: 500 }
    );
  }
}
