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
        likes: true, // Fetch likes for the post
        bookmarks: true, // Fetch bookmarks for the post
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

    // Check if the current logged-in user has liked the post
    const isLiked = userId ? post.likes.some((like) => like.userId === userId) : false;

    // Check if the current logged-in user has bookmarked the post
    const isBookmarked = userId ? post.bookmarks.some((bookmark) => bookmark.userId === userId) : false;

    // Return the post data along with the like count, bookmark status, and whether the post is liked by the current user
    return NextResponse.json({
      ...post,
      likeCount: post.likes.length, // Calculate like count
      comments: post.comments, // Return comments
      isLiked, // Whether the logged-in user liked this post
      isBookmarked, // Whether the logged-in user bookmarked this post
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
