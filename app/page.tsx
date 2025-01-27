import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/mainContent";
import "./globals.css";
import Suggesstionbar from "@/components/Suggestionbar";

export default function Home() {
  return (
    <div className="bg-white overflow-hidden min-h-screen ">
      <div className="hidden md:flex">
        <div className="fixed w-1/4 border-r border-gray-100 lg:w-1/6 h-screen overflow-y-auto hide-scrollbar">
          <Sidebar />
        </div>

        <div className="shadow-2xl border absolute p-4 bg-white rounded-lg h-[400px] bottom-3 left-3 right-3 w-[380px]">
            <div className=" flex gap-2">
              <div className="rounded-full h-8 w-8 bg-yellow-300"></div>
              <div className="border p-2 rounded-lg h-[80px] w-[90%]">
                <p className="text-gray-700">The Healer in clash of clans, despite her aerodynamically unfavourable desing, is...</p>
              </div>
            </div>
            <div>
              <p className="mt-4 text-gray-400 animate-pulse">ProBot is thinking...✨</p>
            </div>
        </div>

        <div className="ml-[25%]  h-screen overflow-y-auto hide-scrollbar w-3/4 lg:w-1/2">
          <MainContent />
        </div>

        <div className="hidden lg:block  fixed right-0 md:mt-20 w-1/4 min-h-screen hide-scrollbar overflow-y-auto p-4">
          <Suggesstionbar />
        </div>
      </div>

      <div className="md:hidden h-screen">
        <div className="h-[calc(100vh-64px)] overflow-y-auto hide-scrollbar">
          <MainContent />
        </div>
        <div className="fixed bottom-0 w-full h-16 bg-white border-t border-gray-200">
          <Sidebar isMobile={true} />
        </div>
      </div>
    </div>
  );
}
