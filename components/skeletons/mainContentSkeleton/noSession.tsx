'use client'

import { useRouter } from "next/navigation";

export default function NoSession() {
    const router = useRouter();
    return <div className="text-black m-5  text-xl flex items-center justify-center  min-h-screen">
            <div>Please signin first to create a Post...!</div>
            <button
              onClick={() => {
                router.push("/auth/signin");
              }}
              type="button"
              className="text-white mt-5 ml-24 bg-gray-800 hover:bg-gray-900   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-70 dark:border-gray-700"
            >
              Signin
            </button>
          </div>
}
