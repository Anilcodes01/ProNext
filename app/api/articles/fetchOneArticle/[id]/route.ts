import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        user: true,
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
    return NextResponse.json(
      {
        message: "Article fetched successfully!",
        article,
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
