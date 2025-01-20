import { useRef } from "react";

export const useScrollToBottom = () => {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      const container = messageContainerRef.current;
      // Add extra padding to account for the input height
      container.scrollTo({
        top: container.scrollHeight + 1000, // Adding extra scroll to ensure we reach bottom
        behavior: "smooth",
      });
    }
  };

  const isScrolledToBottom = () => {
    const container = messageContainerRef.current;
    if (!container) return false;

    // Increased threshold to account for the input height
    const threshold = 400;
    return (
      container.scrollHeight - container.scrollTop - container.clientHeight <=
      threshold
    );
  };

  return {
    messageContainerRef,
    scrollToBottom,
    isScrolledToBottom,
  };
};