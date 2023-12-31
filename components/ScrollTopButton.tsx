"use client";

import usePlayer from "@/hooks/usePlayer";

const ScrollTopButton = () => {
  const handleScrollTop = () => {
    const scrollBox = document.getElementById("scroll-box");
    if (scrollBox) {
      scrollBox.scroll({ top: 0, behavior: "smooth" });
    }
  };
  const player = usePlayer();
  const bottomOffset = player?.loaded ? "bottom-[7rem]" : "bottom-[2rem]";

  return (
    <div className={"fixed right-[2rem] z-10 invisible md:visible " + bottomOffset}>
      <button
        aria-label="Scroll to top"
        type="button"
        onClick={handleScrollTop}
        className="hover:scale-105 duration-300 rounded-2xl bg-neutral-200 p-2 text-neutral-500 transition-all hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollTopButton;
