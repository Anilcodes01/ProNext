'use client';

import Appbar from '@/components/appbar'
import EditProfileForm from "@/components/editProfileform";
import Sidebar from '@/components/Sidebar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EditProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the user is not logged in, redirect to the login page
    if (status === 'unauthenticated') {
      router.push('/auth/login'); // Adjust this based on your app's login route
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Show a loading state while session is being fetched
  }

  if (!session?.user) {
    return <div>Error: Unable to fetch user session.</div>;
  }

  return (
    <div className='min-h-screen bg-white'>
      <div className='h-16'>
        <Appbar />
      </div>
      <div className='flex'>
        <div className=" fixed w-52  lg:w-80 h-full ">
            <Sidebar />
        </div>
        <div  className="ml-52 border-l w-full lg:mr-52 min-h-screen overflow-x-hidden lg:ml-80 border-r border-gray-200  ">
        <EditProfileForm />
        </div>
      </div>
    </div>
  );
}
