import Appbar from "@/components/appbar";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/mainContent";

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex-1 flex">
        <div className="hidden md:block fixed w-52 lg:w-80 h-full">
          <Sidebar />
        </div>

        <div className="w-full ml-0 md:ml-52 lg:ml-80  lg:mr-52 border-r border-l border-gray-200">
          <MainContent />
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200">
        <Sidebar isMobile={true} />
      </div>
    </div>
  );
}
