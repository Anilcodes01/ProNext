import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const senderId = searchParams.get("senderId");
  const receiverId = searchParams.get("receiverId");

  if (!senderId || !receiverId) {
    return NextResponse.json(
      {
        message: "Missing parameters",
      },
      { status: 400 }
    );
  }

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { AND: [{ senderId }, { receiverId }] },
          { AND: [{ senderId: receiverId }, { receiverId: senderId }] },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      {
        message: "Error while fetching messages..!",
      },
      { status: 500 }
    );
  }
}
