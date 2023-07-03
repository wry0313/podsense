"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

import Button from "./Button";
import AuthModal from "@/components/AuthModal";

import useDebounceValue from "@/hooks/useDebounceValue";
import { useEffect, useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const authModal = useAuthModal();
  const router = useRouter();
  const pathname = usePathname();

  // IMPORTANT: we use useSupabaseClient when everything the reads are public to read for everyone (unathenticated users)
  // however if something can only be read with authenticated user, we use useSessionContext instead
  const { user, isLoadingUser } = useUser();

  const [value, setValue] = useState("");
  const debouncedValue = useDebounceValue(value, 300);

  useEffect(() => {
    if (debouncedValue === "") {
      router.push("/");
    } else {
      router.push("/search/" + debouncedValue);
    }
  }, [debouncedValue, router]);

  return (
    <>
      <AuthModal />
      <div
        className="
            w-full
            flex
            items-center
            h-[4rem]
            justify-between
            px-6
            select-none
            bg-white
            dark:bg-dark-default
        "
      >
        {/* mobile view */}
        <div className="flex md:hidden gap-x-2 items-center">
          <Link
            href="/"
            className="rounded-full p-2 bg-neutral-100 dark:bg-dark-100 flex items-center justify-center hover:opacity-75 transition"
          >
            <HiHome className="text-black dark:text-white" size={20} aria-label="home" />
          </Link>
          <Link
            href="/search"
            className="rounded-full p-2 bg-neutral-100 dark:bg-dark-100 flex items-center justify-center hover:opacity-75 transition"
          >
            <BiSearch className="text-black dark:text-white" size={20} aria-label="search" />
          </Link>
        </div>
        <div
          className="
                hidden
                md:flex
                gap-x-2
                items-center
                grow
            "
        >
          <button
            aria-label="back"
            className="rounded-xl bg-neutral-100 dark:bg-dark-100 flex items-center justify-center hover:opacity-75 transition"
            onClick={() => router.back()}
          >
            <RxCaretLeft size={35} />
          </button>
          <button
            aria-label="forward"
            className="rounded-xl bg-neutral-100 dark:bg-dark-100 flex items-center justify-center hover:opacity-75 transition"
            onClick={() => router.forward()}
          >
            <RxCaretRight size={35} />
          </button>
        </div>

        {(pathname === "/" ||
          pathname.slice(0, 8) === "/search/" ||
          pathname.slice(0, 9) === "/podcast/" ||
          pathname.slice(0, 9) === "/episode/") && (
          <div className="grow hidden xl:flex">
            <input
              type="search"
              placeholder="Search podcasts or episodes"
              className=" w-[30rem] rounded-md bg-neutral-100 dark:bg-dark-100 px-2 py-1 focus:border-neutral-300 dark:focus:border-dark-300 border-2 border-transparent outline-none placeholder:text-neutral-500 text-md"
              onChange={(e) => setValue(e.target.value)}
            ></input>
          </div>
        )}

        <div className="w-[250px] flex-row flex items-center justify-end">
          <DarkModeToggle />

            {!isLoadingUser &&
              (user ? (
                <div className="ml-5 ">
                  <Button onClick={() => router.push("/account")} className="justify-end">
                    <FaUserAlt size={20} />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="ml-3">
                    <Button
                      onClick={authModal.onOpen}
                      className="

                          bg-transparent
                          text-neutral-700
                          dark:bg-transparent
                          dark:text-dark-800
                          font-medium
                          "
                    >
                      Sign up
                    </Button>
                  </div>
                  <div>
                    <Button onClick={authModal.onOpen} className="px-6 py-2">
                      Log in
                    </Button>
                  </div>
                </>
              ))}
          </div>
        </div>


      <div className="h-[calc(100%-64px)] dark:bg-dark-default">{children}</div>
    </>
  );
};

export default Header;
