import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        bio: true,
        website: true,
        city: true,
        techStack: true
      },
    });
    return NextResponse.json(
      {
        message: "Users fetched successfully!",
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching users",
        error,
      },
      { status: 500 }
    );
  }
}
