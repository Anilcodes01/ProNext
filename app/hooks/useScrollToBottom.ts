import { useRef } from "react";

export const useScrollToBottom = () => {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      const container = messageContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const isScrolledToBottom = () => {
    const container = messageContainerRef.current;
    if (!container) return false;

    const threshold = 100;
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
