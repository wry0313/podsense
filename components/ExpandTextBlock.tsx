"use client";

import { useState } from "react";

function ExpandTextBlock({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="my-2">
      {expanded ? (
        <div>{text}</div>
      ) : (
        <div className="line-clamp-4">{text}</div>
      )}
        <button
          className="mt-3 text-blue-500"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Read less" : "Read more"}
        </button>

    </div>
  );
}

export default ExpandTextBlock;
