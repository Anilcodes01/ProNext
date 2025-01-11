import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/mainContent";
import "./globals.css";
import Suggesstionbar from "@/components/Suggestionbar";

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <div className="hidden md:flex">
        <div className="fixed w-1/4 border-r border-gray-100 lg:w-1/6 h-screen">
          <Sidebar />
        </div>

        <div className="ml-[25%]  w-3/4 lg:w-1/2 hide-scrollbar min-h-screen ">
          <MainContent />
        </div>

        <div className="hidden lg:block fixed right-0 w-1/4 min-h-screen hide-scrollbar p-4">
          <Suggesstionbar />
        </div>
      </div>

      <div className="md:hidden min-h-screen">
        <div className="pb-16 hide-scrollbar">
          <MainContent />
        </div>
        <div className="fixed bottom-0 w-full bg-white border-t border-gray-200">
          <Sidebar isMobile={true} />
        </div>
      </div>
    </div>
  );
}
