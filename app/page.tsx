"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/mainContent";
import Suggesstionbar from "@/components/Suggestionbar";
import axios from "axios";
import "./globals.css";
import PostExplainer from "@/components/PostExplainer";

export default function Home() {
  const [showExplainer, setShowExplainer] = useState(false);
  const [currentPostContent, setCurrentPostContent] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

        <PostExplainer
          showExplainer={showExplainer}
          setShowExplainer={setShowExplainer}
          currentPostContent={currentPostContent}
          explanation={explanation}
          isLoading={isLoading}
        />

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

          <PostExplainer
            showExplainer={showExplainer}
            setShowExplainer={setShowExplainer}
            currentPostContent={currentPostContent}
            explanation={explanation}
            isLoading={isLoading}
          />
        </div>
        <div className="fixed bottom-0 w-full h-16 bg-white border-t border-gray-200">
          <Sidebar isMobile={true} />
        </div>
      </div>
    </div>
  );
}