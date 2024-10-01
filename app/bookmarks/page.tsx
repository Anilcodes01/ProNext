import Appbar from "@/components/appbar";
import BookmarkComponent from "@/components/bookmark";
import Sidebar from "@/components/Sidebar";


export default function BookmarkPage() {


    return <div className="bg-white min-h-screen">
        <div>
            <Appbar />
        </div>
        <div className="flex">
            <div className=" fixed w-52 mt-16 lg:w-80 h-full ">
                <Sidebar />
            </div>
            <div className="ml-52 min-h-screen p-6 border-l mt-12 w-full lg:ml-80 border-r border-gray-200 lg:mr-52 ">
                <BookmarkComponent />
            </div>
        </div>
    </div>
}