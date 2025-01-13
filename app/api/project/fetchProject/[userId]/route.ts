import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 }
      );
    }

    const projects = await prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
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
      {
        message: "Projects fetched successfully...",
        projects,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while fetching Projects:", error);
    return NextResponse.json(
      {
        message: "Error while fetching Projects...",
        error,
      },
      { status: 500 }
    );
  }
}
