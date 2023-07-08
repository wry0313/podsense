"use client";

import usePlayer from "@/hooks/usePlayer";
import useSidebar from "@/hooks/useSidebar";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Player from "./Player";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const sidebar = useSidebar();
  const player = usePlayer();
  const height = player?.loaded ? "h-[calc(100%-90px)]" : "h-full";

  return (
    <main className={"flex flex-row " + height}>
      {sidebar.isOpen && <Sidebar />}
      <Player />
      <div className=" w-full h-full ">
        <Header />
        <div className="h-[calc(100%-64px)] ">
          <div
            id="scroll-box"
            className="h-full w-full overflow-y-auto overflow-hidden px-6 bg-white dark:bg-dark-default"
          >
            <div className="max-w-[1300px] mx-auto">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PageLayout;
