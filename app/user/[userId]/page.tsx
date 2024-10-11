import Appbar from "@/components/appbar";
import Sidebar from "@/components/Sidebar";
import UserComponent from "@/components/userComponent";


export default function UserProfile() {

    return <div className="bg-white  min-h-screen">
        <div className="h-16 ">
            <Appbar />
        </div>
        <div>
            <div className="hidden md:block fixed w-52 lg:w-80 h-full">
                <Sidebar />
            </div>
            <div className=" ml-0  md:ml-52 overflow-x-hidden lg:ml-80 border-l border-gray-200">
               <UserComponent />
            </div>
        </div>
        
    </div>
}