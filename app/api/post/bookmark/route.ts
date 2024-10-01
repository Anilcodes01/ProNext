import { authOptions } from "@/app/lib/authOptions";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
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

    const { postId } = await req.json();
    const userId = session.user.id;

    const bookmark = await prisma.bookmark.create({
      data: {
        userId,
        postId,
      },
    });

    return NextResponse.json(
      {
        message: "Bookmark created successfully...",
        bookmark,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while bookmarking post",
        error,
      },
      { status: 500 }
    );
  }
};
