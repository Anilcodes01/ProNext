
"use client";

import {  useEffect, useRef } from "react";
import { SiGooglegemini } from "react-icons/si";
import { X } from "lucide-react";
import { motion , AnimatePresence} from "framer-motion";


interface PostExplainerProps {
  showExplainer: boolean;
  setShowExplainer: (show: boolean) => void;
  currentPostContent: string;
  explanation: string;
  isLoading: boolean;
}

export default function PostExplainer({
  showExplainer,
  setShowExplainer,
  currentPostContent,
  explanation,
  isLoading,
}: PostExplainerProps) {
  const explainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        explainerRef.current &&
        !explainerRef.current.contains(event.target as Node)
      ) {
        setShowExplainer(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowExplainer]);

  return (
    <AnimatePresence>
      {showExplainer && (
        <motion.div
          ref={explainerRef}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.3,
          }}
          className="post-explainer shadow-2xl border fixed p-4 bg-white rounded-lg h-[400px] bottom-3 left-3 right-3 w-[380px] z-50 flex flex-col"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-between items-center mb-4"
          >
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-full h-8 w-8 bg-yellow-300 flex items-center justify-center"
              >
                <SiGooglegemini size={20} className="text-white" />
              </motion.div>
              <span className="font-medium text-sm">ProBot Explanation</span>
            </div>
            <button
              onClick={() => setShowExplainer(false)}
              className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border rounded-lg p-3 bg-gray-50 mb-4"
          >
            <p className="text-gray-700 text-sm">
              {currentPostContent.slice(0, 100)}
              {currentPostContent.length > 100 && "..."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-1 overflow-y-auto pr-2 hide-scrollbar"
          >
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}