"use client"; // b/c this is dynamic also this doesn't mean that children will become client components too

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Podcast } from "@/types";
import Link from "next/link";



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
        label: "Explore",
        active: pathname === "/",
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
        h-full
        w-[300px]
        p-2
        bg-neutral-50
        "
      >
        <Link 
        className="
        text-3xl 
        font-bold 
        flex 
        items-center 
        justify-center 
        cursor-pointer 
        hover:text-neutral-600
        "
        href="/"
        >
          Podsense🎙️.net
        </Link>
        

          <div className="flex flex-col pt-1">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>


        <div className="overflow-y-auto h-full">
          <Library podcasts={podcasts}/>
        </div>
      </div>
      <main className="h-full flex-1">{children}</main>
    </div>
  );
};

export default Sidebar;
