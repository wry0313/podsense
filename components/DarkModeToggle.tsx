"use client"

import { useTheme } from "next-themes";

const DarkModeToggle = () => {
    const { theme, setTheme } = useTheme();
    return ( 
        <>
        <div
        onClick={theme === "dark" ? () => setTheme("light") : () => setTheme("dark")}
          className={"focus-invisible"}
        >
          <svg
            className={`hidden h-5 w-5 dark:block sm:h-6 sm:w-6 text-neutral-800`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            className={`block h-6 w-6 dark:hidden text-neutral-800`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="gray"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </div>
      </>
     );
}
 
export default DarkModeToggle;