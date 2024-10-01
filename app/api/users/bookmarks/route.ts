import { authOptions } from "@/app/lib/authOptions";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
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

    const userId = session.user.id;

    const bookmarkedPosts = await prisma.bookmark.findMany({
      where: {
        userId: userId,
      },
      include: {
        post: {
          include: {
            user: {
              select: {
                name: true,
                avatarUrl: true,
              },
            },
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
            likes: {
              where: {
                userId: userId,
              },
            },
            bookmarks: {
              where: {
                userId: userId,
              },
            },
          },
        },
      },
    });

    const posts = bookmarkedPosts.map((bookmark) => {
      const post = bookmark.post;
      return {
        ...post,
        isLiked: post.likes.length > 0,
        isBookmarked: post.bookmarks.length > 0,
        likeCount: post._count.likes,
        commentCount: post._count.comments,
      };
    });

    return NextResponse.json(
      {
        message: "Bookmarked posts fetched successfully!",
        posts,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while fetching bookmark...",
        error,
      },
      { status: 500 }
    );
  }
};
