import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

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
    <Link href={`/articles/${article.id}`} passHref>
    <div className="bg-white-800 cursor-pointer hover:bg-gray-100 items-start border mt-4 rounded-lg w-full p-4">
      <div className="flex items-center mb-4">
        {article.user && article.user.avatarUrl ? (
          <Image
            src={article.user.avatarUrl}
            alt="User Profile"
            width={34}
            height={34}
            className="rounded-full text-black object-cover"
          />
        ) : (
          <FaUserCircle className="w-6 h-6 text-black" />
        )}
        <div className="ml-2">
          <div className="text-lg text-black font-semibold">
            {article.user?.name || "Unknown User"}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start">
      <div className="text-xl text-black font-semibold">{article.title}</div>
      <p className="text-gray-600  mt-2">{article.description}</p>
      </div>
    </div>
    </Link>
  );
}
