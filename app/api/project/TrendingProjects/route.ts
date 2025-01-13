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
          message: "Unauthorized...!",
        },
        { status: 401 }
      );
    }

    const allProjectIds = await prisma.project.findMany({
      select: {
        id: true,
      },
    });

    if (allProjectIds.length === 0) {
      return NextResponse.json(
        {
          message: "No projects found",
          projects: [],
        },
        { status: 200 }
      );
    }

    const selectedIndices = new Set<number>();
    while (
      selectedIndices.size < 4 &&
      selectedIndices.size < allProjectIds.length
    ) {
      const randomIndex = Math.floor(Math.random() * allProjectIds.length);
      selectedIndices.add(randomIndex);
    }

    const selectedIds = Array.from(selectedIndices).map(
      (index) => allProjectIds[index].id
    );

    const randomProjects = await prisma.project.findMany({
      where: {
        id: {
          in: selectedIds,
        },
      },
      select: {
        id: true,
        projectName: true,
        projectDescription: true,
        projectLink: true,
        image: true,
      },
    });

    const shuffledProjects = randomProjects.sort(() => Math.random() - 0.5);

    return NextResponse.json(
      {
        projects: shuffledProjects,
        message: "Projects fetched successfully...!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while fetching trending projects...!",
        error,
      },
      { status: 500 }
    );
  }
}
