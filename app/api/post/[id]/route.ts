import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ?? null;

    const post = await prisma.post.findUnique({
      where: { id: String(id) },
      include: {
        user: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
        likes: true, 
        bookmarks: true, 
        comments: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
              select: {
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

   
    const isLiked = userId ? post.likes.some((like) => like.userId === userId) : false;

   
    const isBookmarked = userId ? post.bookmarks.some((bookmark) => bookmark.userId === userId) : false;

    
    return NextResponse.json({
      ...post,
      likeCount: post.likes.length, 
      comments: post.comments, 
      isLiked, 
      isBookmarked, 
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
