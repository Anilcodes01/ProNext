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
      select: {
        postId: true, 
      },
    });

    const postIds = bookmarkedPosts.map((bookmark) => bookmark.postId);


    const posts = await prisma.post.findMany({
      where: {
        id: { in: postIds },
      },
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
      orderBy: {
        createdAt: 'desc', 
      },
    });

    
    const transformedPosts = posts.map((post) => {
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
        posts: transformedPosts,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while fetching bookmarks...",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
