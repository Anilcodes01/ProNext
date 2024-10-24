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
        { status: 400 }
      );
    }

    const { articleId } = await req.json();
    const userId = session.user.id;

    const bookmark = await prisma.bookmark.create({
      data: {
        userId,
        articleId,
      },
    });

    return NextResponse.json(
      {
        message: "bookmark added successfully...",
        bookmark,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while bookmarking the post...",
        error,
      },
      { status: 500 }
    );
  }
}
