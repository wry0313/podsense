"use client"; 

import usePlayer from "@/hooks/usePlayer";
import useSidebar from "@/hooks/useSidebar";

import Sidebar from "./Sidebar";
import Player from "./Player";
import { useState } from "react";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ 
  children,

 }) => {

  const sidebar = useSidebar();
  const player = usePlayer();

  const height = player?.loaded ? "h-[calc(100%-90px)]" : "h-full";
  const width = sidebar?.isOpen ? "md:w-[calc(100%-300px)]" : "";

  const [transitionState, setTransitionState] = useState(false)

  
  return (
    <div className={"flex flex-row " + height}>
      {sidebar.isOpen && <Sidebar />}
      <Player />
      <main className={"h-full w-full " + width}>
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
