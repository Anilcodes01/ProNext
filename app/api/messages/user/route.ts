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

    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id: session.user.id,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
      },
    });

    return NextResponse.json(
      {
        message: "User fetched successfully...!",
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while fetching users:", error);
    return NextResponse.json(
      {
        message: "Oops..!, Error while fetching users...!",
      },
      { status: 500 }
    );
  }
}
