import { Suspense } from 'react';
import ArticleList from '@/components/articleList'
import Appbar from "@/components/appbar";
import AllArticleSkeleton from '@/components/allArticleSkeleton';
import Sidebar from '@/components/Sidebar';

export const revalidate = 60; // revalidate this page every 60 seconds

export default function Articles() {
  return (
    <div className="bg-white text-black min-h-screen">
      <div>
        <Appbar />
      </div>
      <div className='flex min-h-screen'>
        <div className='fixed w-52 mt-16 lg:w-80 h-full '>
          <Sidebar />
        </div>
        <div className="ml-52 border-l min-h-screen lg:ml-80 border-r border-gray-200 lg:mr-52 p-8">
        <div className="text-4xl font-bold mt-16">All Articles</div>
        <Suspense fallback={<AllArticleSkeleton />}>
          <ArticleList />
        </Suspense>
      </div>
      </div>
    </div>
  );
}