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
      <div className="bg-white cursor-pointer hover:bg-gray-100 border mt-4 rounded-lg w-full p-4">
        {/* User Info */}
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
          <div className="ml-2 flex">
            <div className="text-lg text-black font-semibold">
              {article.user?.name || "Unknown User"}
            </div>
            <div className="text-sm text-black ml-2 mt-1">
            {" . "}
            {new Date(article.createdAt).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="flex flex-col md:flex-row">
          {/* Article Text */}
          <div className={`flex flex-col ${article.image ? "w-full md:w-3/4" : "w-full"} mb-4 md:mb-0`}>
            <div className="text-xl text-black font-semibold">
              {article.title}
            </div>
            <p className="text-gray-600 mt-2">
              {article.description.length > 200
                ? `${article.description.slice(0, 200)}...`
                : article.description}
            </p>
          </div>

          {/* Article Image (Visible only if available) */}
          {article.image && (
            <div className="w-full md:w-1/4 mt-4 md:mt-0 md:ml-4 flex justify-center items-center">
              <Image
                src={article.image}
                alt={article.title}
                width={200}
                height={200}
                className="rounded-lg border object-cover w-full md:w-auto"
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
