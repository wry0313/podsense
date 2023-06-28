"use client";
import { useEffect, useRef, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const TextBlock = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [isClamped, setIsClamped] = useState(false);

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
        className={`overflow-hidden ${
          expanded ? "line-clamp-none" : "line-clamp-3"
        }`}
        ref={textRef}
      >
        {text}
      </div>

      {isClamped && !expanded && (
        <div className="absolute bottom-7 left-0 right-0 bg-gradient-to-t from-white to-transparent h-12 w-full"></div>
      )}
      {isClamped && (
        <button
          className="w-full flex flex-row justify-center items-center mt-2"
          onClick={toggleExpanded}
        >
          {/* {expanded ? 'Show less' : 'Show more'} */}
          <div className="text-neutral-600 bg-neutral-100 rounded-lg px-4">
            <Icon size={28} />
          </div>
        </button>
      )}
    </div>
  );
};

export default TextBlock;
