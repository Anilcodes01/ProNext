"use client";

import SuggestedArticles from "./ArticleComponents/SuggestedArticles";
import SuggestedUsers from "./PostComponent/SuggestedUsers";

export default function Suggestionbar() {
  return (
    <div className="flex flex-col gap-6">
      <SuggestedUsers />
      <SuggestedArticles />
    </div>
  );
}
