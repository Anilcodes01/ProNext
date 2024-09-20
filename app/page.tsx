import Appbar from "@/components/appbar";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/mainContent"

export default function Home() {
  return (
    <div className="bg-gray-800 min-h-screen">
      <div>
        <Appbar />
      </div>
      <div className="grid min-h-screen     grid-cols-10">
        <div className="col-span-2 md:col-span-3  lg:col-span-2  bg-gray-100">
          <Sidebar />
        </div>
        <div className="col-span-6 w-full bg-gray-800  border-l border-r md:col-span-7  text-white lg:col-span-6 md:w-[100%]">
          <MainContent />
        </div>
      </div>
    </div>
  );
}
