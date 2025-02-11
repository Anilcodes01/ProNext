"use client";
import Image from "next/image";
import { Article } from "@/types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BsPencilSquare } from "react-icons/bs";
import { Trash2 } from "lucide-react";
import { TbMessageReport } from "react-icons/tb";
import { MdBlockFlipped } from "react-icons/md";
import axios from "axios";
import { format } from "date-fns";
import CardHeader from "../PostComponent/CardHeader";

export default function ArticleCard({ article }: { article: Article }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  console.log(userId);
  const isOwnPost = userId === article.user.id;
  console.log(article.user.id);
  const router = useRouter();

  const handleDeleteArticle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await axios.post("/api/articles/deleteArticle", {
        articleId: article.id,
      });

      if (response.status === 200) {
        router.refresh();
      } else {
        console.log("Failed to delete article:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to delete article:", error);
    }
  };

  const handleReportPost = async () => {
    try {
      await axios.post("/api/post/report", { postId: article.id });
      alert("Post reported successfully");
    } catch (error) {
      console.error("Failed to report post:", error);
    }
  };

  const dropdownItems = isOwnPost
  ? [
      {
        icon: <BsPencilSquare />,
        label: 'Edit Post',
        onClick: () => router.push(`/post/${article.id}/edit`),
        className: 'hover:bg-gray-100 flex items-center cursor-pointer'
      },
      {
        icon: <Trash2 />,
        label: 'Delete Post',
        onClick: () => handleDeleteArticle,
        className: 'text-red-600 focus:text-red-600 flex items-center font-semibold hover:bg-gray-100 cursor-pointer focus:bg-red-50'
      }
    ]
  : [
      {
        icon: <TbMessageReport />,
        label: 'Report Post',
        onClick: () => handleReportPost,
        className: 'flex items-center'
      },
      {
        icon: <MdBlockFlipped />,
        label: `Block @${article.user.username}`,
        onClick: () => router.push(`/user/${article.user.id}/block`),
        className: 'text-red-600 focus:text-red-600 flex items-center font-semibold hover:bg-gray-100 cursor-pointer focus:bg-red-50'
      }
    ];


  if (!article) {
    return <div className="text-red-500">Error: Article data is missing.</div>;
  }

    const formattedDate = format(new Date(article.createdAt), "MMM dd");

  return (
    <div className="bg-white cursor-pointer hover:bg-gray-100 border mt-4 border-gray-100 rounded-lg w-full p-4">
     <CardHeader  user={article.user }
        date={formattedDate}
      
        dropdownItems={dropdownItems} />

      <div
        onClick={() => {
          router.push(`/articles/${article.id}`);
        }}
        className="flex flex-col md:flex-row"
      >
        <div
          className={`flex flex-col ${
            article.image ? "w-full md:w-3/4" : "w-full"
          } mb-4 md:mb-0`}
        >
          <div className="text-xl text-black font-semibold">
            {article.title}
          </div>
          <p className="text-gray-600 mt-2">
            {article.description.length > 200
              ? `${article.description.slice(0, 200)}...`
              : article.description}
          </p>
        </div>

        {article.image && (
          <div className="w-full md:w-1/4 mt-4 md:mt-0 md:ml-4 flex justify-center items-center">
            <Image
              src={article.image}
              alt={article.title}
              width={1000}
              height={1000}
              className="rounded-lg border object-cover w-full md:w-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}
