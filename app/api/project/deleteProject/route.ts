import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { projectId } = await req.json();

    const deletedProject = await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json({
        message: 'Project deleted successfully!',
        deletedProject
    }, {status: 200})
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while deleting the project...",
        error,
      },
      { status: 500 }
    );
  }
}
