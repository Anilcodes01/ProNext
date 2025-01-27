"use client";
import { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/mainContent";
import Suggesstionbar from "@/components/Suggestionbar";
import { SiGooglegemini } from "react-icons/si";
import axios from "axios";
import "./globals.css";
import { X } from "lucide-react";

export default function Home() {
  const [showExplainer, setShowExplainer] = useState(false);
  const [currentPostContent, setCurrentPostContent] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const explainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        explainerRef.current &&
        !explainerRef.current.contains(event.target as Node)
      ) {
        setShowExplainer(false);
        setExplanation("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const convertMarkdownToBold = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  const handleGeminiClick = async (postContent: string) => {
    setCurrentPostContent(postContent);
    setShowExplainer(true);
    setIsLoading(true);

    try {
      const response = await axios.post("/api/ai/postExplainer", {
        content: postContent,
      });

      setExplanation(convertMarkdownToBold(response.data.explainedContent));
    } catch (error) {
      console.error("Failed to get post explanation:", error);
      setExplanation("Failed to generate explanation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white overflow-hidden min-h-screen">
      <div className="hidden md:flex">
        <div className="fixed w-1/4 border-r border-gray-100 lg:w-1/6 h-screen overflow-y-auto hide-scrollbar">
          <Sidebar />
        </div>

        {showExplainer && (
          <div
            ref={explainerRef}
            className="post-explainer shadow-2xl border fixed p-4 bg-white rounded-lg h-[400px] bottom-3 left-3 right-3 w-[380px] z-50 flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full h-8 w-8 bg-yellow-300 flex items-center justify-center">
                  <SiGooglegemini size={20} className="text-white" />
                </div>
                <span className="font-medium text-sm">ProBot Explanation</span>
              </div>
              <button
                onClick={() => setShowExplainer(false)}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="border rounded-lg p-3 bg-gray-50 mb-4">
              <p className="text-gray-700 text-sm">
                {currentPostContent.slice(0, 100)}
                {currentPostContent.length > 100 && "..."}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent mb-2"></div>
                  <p className="text-gray-400">ProBot is thinking...✨</p>
                </div>
              ) : (
                <div
                  className="text-gray-700 text-sm whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: explanation }}
                ></div>
              )}
            </div>
          </div>
        )}

        <div className="ml-[25%] h-screen overflow-y-auto hide-scrollbar w-3/4 lg:w-1/2">
          <MainContent onGeminiClick={handleGeminiClick} />
        </div>

        <div className="hidden lg:block fixed right-0 md:mt-20 w-1/4 min-h-screen hide-scrollbar overflow-y-auto p-4">
          <Suggesstionbar />
        </div>
      </div>

      <div className="md:hidden h-screen">
        <div className="h-[calc(100vh-64px)] overflow-y-auto hide-scrollbar">
          <MainContent onGeminiClick={handleGeminiClick} />
        </div>
        <div className="fixed bottom-0 w-full h-16 bg-white border-t border-gray-200">
          <Sidebar isMobile={true} />
        </div>
      </div>
    </div>
  );
}
