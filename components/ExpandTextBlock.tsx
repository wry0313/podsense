"use client";

import { useMemo, useState } from "react";

function ExpandTextBlock({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  // text replace all <br /> with \n and usememo
  text = useMemo(() => {
    return text.replace(/<br\s*\/?>/gm, "\n");
  }, [text]);
  return (
    <div className="my-2">
      {expanded ? (
        <div>{text}</div>
      ) : (
        <div className="line-clamp-3">{text}</div>
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
