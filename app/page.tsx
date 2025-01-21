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
