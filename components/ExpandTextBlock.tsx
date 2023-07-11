"use client";
import { useEffect, useRef, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const TextBlock = ({ htmlText }: { htmlText: string }) => {
  const [expanded, setExpanded] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [isClamped, setIsClamped] = useState(true);

  useEffect(() => {
    const textElement = textRef.current!;
    if (textElement) {
      const isTextClamped = textElement.scrollHeight > textElement.offsetHeight;
      setIsClamped(isTextClamped);
    }
  }, []);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const Icon = expanded ? MdExpandLess : MdExpandMore;

  return (
    <div className="relative" id="text-div">
      <div
        className={`overflow-hidden whitespace-pre-line ${
          expanded ? "line-clamp-none" : "line-clamp-3"
        }`}
        ref={textRef}
        dangerouslySetInnerHTML={{ __html: htmlText }} // Render HTML content
      />

      {isClamped && !expanded && (
        <div className="absolute bottom-7 left-0 right-0 bg-gradient-to-t from-white dark:from-dark-default to-transparent h-12 w-full"></div>
      )}

      {isClamped && (
        <button
          aria-label="expand or collapse text"
          className="w-fit flex flex-row justify-center items-center mt-2 mx-auto"
          onClick={toggleExpanded}
        >
          <div className="text-neutral-600 bg-neutral-100 dark:bg-dark-100 rounded-lg px-4">
            <Icon size={28} />
          </div>
        </button>
      )}
      
    </div>
  );
};

export default TextBlock;

