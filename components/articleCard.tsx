import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

interface ArticleProps {
  article: {
    id: string;
    title: string;
    description: string;
    image?: string | null;
    createdAt: string;
    updatedAt: string;
    userId: string;
    user: {
      name: string;
      avatarUrl?: string | null;
    };
  };
}

export default function ArticleCard({ article }: ArticleProps) {
  console.log("Article data passed to ArticleCard:", article);

  if (!article) {
    return <div className="text-red-500">Error: Article data is missing.</div>;
  }

  return (
    <div className="bg-gray-800 cursor-pointer items-start border mt-4 rounded-lg w-full p-4">
      <div className="flex items-center mb-4">
        {article.user && article.user.avatarUrl ? (
          <Image
            src={article.user.avatarUrl}
            alt="User Profile"
            width={24}
            height={24}
            className="rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="w-6 h-6 text-white" />
        )}
        <div className="ml-2">
          <div className="text-sm font-bold">
            {article.user?.name || "Unknown User"}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start">
      <div className="text-xl font-semibold">{article.title}</div>
      <p className="text-gray-400 mt-2">{article.description}</p>
      </div>
    </div>
  );
}
