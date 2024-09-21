import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, description, content, userId } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found!",
        },
        { status: 404 }
      );
    }

    const newArticle = await prisma.article.create({
      data: {
        title,
        description,
        content,
        userId,
      },
      include: {
        user: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Article created successfully!", newArticle },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while creating Article!",
        error,
      },
      { status: 500 }
    );
  }
}
