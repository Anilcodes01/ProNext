import Appbar from "@/components/appbar";
import Sidebar from "@/components/Sidebar";
import UserComponent from "@/components/userComponent";


export default function UserProfile() {

    return <div className="bg-white  min-h-screen">
        <div className="h-16 ">
            <Appbar />
        </div>
        <div>
            <div className=" fixed w-52  lg:w-80 h-full ">
                <Sidebar />
            </div>
            <div className="ml-52 border-l  overflow-x-hidden lg:ml-80 border-r border-gray-200  ">
               <UserComponent />
            </div>
        </div>
    </div>
}