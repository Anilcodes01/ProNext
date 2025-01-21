import Sidebar from "@/components/Sidebar";
import UserComponent from "@/components/userComponent";

export default function UserProfile() {
  return (
    <div className="bg-white min-h-screen">
      <div className="flex">
        <div className="hidden md:block fixed w-52 lg:w-80 h-full">
          <Sidebar />
        </div>
        <div className="flex-1 ml-0 md:ml-52 lg:ml-80 border-l hide-scrollbar overflow-y-auto h-screen border-gray-200">
          <UserComponent />
        </div>
      </div>
    </div>
  );
}
