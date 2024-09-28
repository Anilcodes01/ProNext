import Appbar from "@/components/appbar";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/mainContent";

export default function Home() {
  return (
   <div className="bg-white min-h-screen">
    <div className="h-16 ">
      <Appbar />
    </div>
    <div className="flex">
<div className=" fixed w-52  lg:w-80 h-full ">
  <Sidebar />
</div>
<div className="ml-52 border-l w-full lg:ml-80 border-r border-gray-200 lg:mr-52 ">
  <MainContent />
</div>
    </div>
   </div>
  );
}
