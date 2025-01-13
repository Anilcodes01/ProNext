"use client";

import SuggestedArticles from "./SuggestedArticles";
import SuggestedUsers from "./SuggestedUsers";

export default function Suggestionbar() {
  return (
    <div className="flex flex-col gap-6">
      <SuggestedUsers />
      <SuggestedArticles />
    </div>
  );
}
