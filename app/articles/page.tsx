import { Suspense } from 'react';
import ArticleList from '@/components/articleList'
import Appbar from "@/components/appbar";
import AllArticleSkeleton from '@/components/allArticleSkeleton';

export const revalidate = 60; // revalidate this page every 60 seconds

export default function Articles() {
  return (
    <div className="bg-gray-800 min-h-screen">
      <div>
        <Appbar />
      </div>
      <div className="p-8">
        <div className="text-4xl font-bold">All Articles</div>
        <Suspense fallback={<AllArticleSkeleton />}>
          <ArticleList />
        </Suspense>
      </div>
    </div>
  );
}