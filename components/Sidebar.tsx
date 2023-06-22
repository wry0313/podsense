"use client"; // b/c this is dynamic also this doesn't mean that children will become client components too

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Podcast } from "@/types";

interface SidebarProps {
  children: React.ReactNode;
  podcasts: Podcast[];
}
const Sidebar: React.FC<SidebarProps> = ({ 
  children,
  podcasts
 }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex h-full">
      <div
        className="
        hidden
        md:flex
        flex-col
        gap-y-2
        h-full
        w-[300px]
        p-2
        bg-neutral-50
        "
      >
        <Box className="text-3xl font-bold flex items-center justify-center">
          Chat with 🎙️
        </Box>
        
        <Box>
          <div className="flex flex-col gap-y-4 py-4 px-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>

        <Box className="overflow-y-auto h-full">
          <Library podcasts={podcasts}/>
        </Box>
      </div>
      <main className="h-full flex-1">{children}</main>
    </div>
  );
};

export default Sidebar;
