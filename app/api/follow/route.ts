import { authOptions } from "@/app/lib/authOptions";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const { followingId } = await req.json();

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  const followerId = session.user.id;

  try {
    const follow = await prisma.follow.create({
      data: { followerId, followingId },
    });
    return NextResponse.json(
      {
        message: "User followed successfully",
        follow,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while following the user...",
        error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  const { followingId } = await req.json();

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  const followerId = session.user.id;

  try {
    const unfollow = await prisma.follow.deleteMany({
      where: { followerId, followingId },
    });
    return NextResponse.json(
      {
        message: "User unfollowed successfully!",
        unfollow,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error unfollowing the user...",
        error,
      },
      { status: 500 }
    );
  }
}


export async function GET() {
    const session = await getServerSession(authOptions);
  
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
  
    const followerId = session.user.id;
  
    try {
      const following = await prisma.follow.findMany({
        where: { followerId },
        select: { followingId: true },
      });
      return NextResponse.json({ following }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching following list...", error },
        { status: 500 }
      );
    }
  }