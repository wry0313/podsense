"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import SidebarItem from "./SidebarItem";
import SidebarLibrary from "./Library";
import Link from "next/link";
import { TbPlaylist } from "react-icons/tb";


const Sidebar = () => {
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
      {
        icon: TbPlaylist,
        label: "Library",
        active: pathname === "/library",
        href: "/library",
      },
    ],
    [pathname]
  );

  return (
    <div
      className="
          hidden
          md:flex
          flex-col
          h-full
          w-[300px]
          flex-none
          p-2
          bg-neutral-50
          dark:bg-dark-50
          select-none
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
          "
        href="/"
      >
        <h1>podsense</h1>
      </Link>

      <div className="flex flex-col pt-1">
        {routes.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </div>

      <div className="overflow-y-auto h-full">
        <SidebarLibrary pathname={pathname} channelName="sidebar library" />
      </div>
    </div>
  );
};

export default Sidebar;
