import {prisma} from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const getPosts = await prisma.post.findMany({
      select: {
        id: true,
        content: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        user: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    

    return new NextResponse(
      JSON.stringify({
        message: "Posts fetched",
        getPosts,
      }),
      {
        headers: {
          "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate, proxy-revalidate",
          "Content-Type": "application/json",
          "Pragma": "no-cache",
          "Expires": "0",
        },
        status: 200,
      }
    );
  } catch (error) {
    // Log the full error for debugging
    console.error("Error fetching posts:", error);

    return NextResponse.json(
      {
        message: "Error while fetching posts!",
        // Only send the error message, not the full error object
      },
      { status: 500 }
    );
  }
}
