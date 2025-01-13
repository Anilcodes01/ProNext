import { authOptions } from "@/app/lib/authOptions";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(res: NextResponse) {
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

    const allUsersIds = await prisma.user.findMany({
      select: {
        id: true,
      },
    });

    if (allUsersIds.length === 0) {
      return NextResponse.json(
        {
          message: "No users found",
          users: [],
        },
        { status: 200 }
      );
    }

    const selectedIndices = new Set<number>();
    while (
      selectedIndices.size < 2 &&
      selectedIndices.size < allUsersIds.length
    ) {
      const randomIndex = Math.floor(Math.random() * allUsersIds.length);
      selectedIndices.add(randomIndex);
    }

    const selectedIds = Array.from(selectedIndices).map(
      (index) => allUsersIds[index].id
    );

    const randomUsers = await prisma.user.findMany({
      where: {
        id: {
          in: selectedIds,
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        avatarUrl: true,
      },
    });

    const shuffledUsers = randomUsers.sort(() => Math.random() - 0.5);

    return NextResponse.json(
      {
        users: shuffledUsers,
        message: "Users fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while fetching users...!",
        error,
      },
      { status: 500 }
    );
  }
}
