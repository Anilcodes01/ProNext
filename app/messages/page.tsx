"use client";

import { useRouter } from "next/navigation";

export default function Messages() {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-b from-blue-100 to-green-50 flex flex-col items-center justify-center min-h-screen w-full p-4 space-y-6">
    <div className="text-8xl animate-bounce">📬</div>
    <h1 className="text-5xl font-extrabold text-blue-600 text-center">
      Messages are on their way!
    </h1>
    <p className="text-lg text-gray-700 text-center max-w-lg">
      We&apos;re still writing a better punchline for this page. In the meantime, why not send a friendly wave to someone? 🏄‍♂️
    </p>
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300">
      Go back to Funland
    </button>
  </div>
  );
}
