import { authOptions } from "@/app/lib/authOptions";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
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

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { techStack: true, id: true },
    });

    if (!user) {
      return NextResponse.json({
        message: "User not found...!",
      });
    }

    const userTechStack = user.techStack || [];

    if (userTechStack.length === 0) {
      const randomDevelopers = await prisma.user.findMany({
        where: {
          id: { not: user.id },
        },
        select: {
          id: true,
          name: true,
          username: true,
          avatarUrl: true,
        },
        take: 3,
      });

      return NextResponse.json(
        {
          message: "No tech stack found, showing random developers...!",
          featuredDevelopers: randomDevelopers,
        },
        { status: 200 }
      );
    }

    const featuredDevelopers = await prisma.user.findMany({
      where: {
        id: { not: user.id },
        techStack: {
          hasSome: userTechStack,
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        avatarUrl: true,
        techStack: true,
      },
      take: 10,
    });

    const relevanceSort = featuredDevelopers
      .map((dev) => ({
        ...dev,
        matchCount: dev.techStack.filter((tech) => userTechStack.includes(tech))
          .length,
      }))
      .sort((a, b) => b.matchCount - a.matchCount)
      .slice(0, 3);

    return NextResponse.json(
      {
        message: "Users fetched successfully...!",
        featuredDevelopers: relevanceSort,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while fetching featured users...!",
        error,
      },
      { status: 500 }
    );
  }
}
