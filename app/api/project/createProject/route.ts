import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { projectName, projectDescription, image, userId } = await req.json();

  try {
    const newProject = await prisma.project.create({
      data: {
        projectName,
        projectDescription,
        image,
        userId,
      },
    });

    return NextResponse.json(
      {
        message: "Project created successfully!",
        newProject,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error creating the project...",
        error,
      },
      { status: 500 }
    );
  }
}
