"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  // IMPORTANT: we use useSupabaseClient when everything we read are public to read for everyone (unathenticated users)
  // however if something can only be read with authenticated user, we use useSessionContext instead
  const { user, isLoading } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // Reset any playing podcast in the future
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully");
    }
  };
  return (
    <>
      <div
        className="
            w-full
            flex
            items-center
            justify-between
            h-[4rem]
            px-6
        select-none
        "
      >
        <div
          className="
                hidden
                md:flex
                gap-x-2
                items-center
            "
        >
          <button
            className="rounded-full bg-neutral-100 flex items-center justify-center hover:opacity-75 transition"
            onClick={() => router.back()}
          >
            <RxCaretLeft size={35} />
          </button>
          <button
            className="rounded-full bg-neutral-100 flex items-center justify-center hover:opacity-75 transition"
            onClick={() => router.forward()}
          >
            <RxCaretRight size={35} />
          </button>
        </div>

        {/* mobile view */}
        <div className="flex md:hidden gap-x-2 items-center">
          <Link
            href="/"
            className="rounded-full p-2 bg-neutral-100 flex items-center justify-center hover:opacity-75 transition"
          >
            <HiHome className="text-black" size={20} />
          </Link>
          <Link
            href="/search"
            className="rounded-full p-2 bg-neutral-100 flex items-center justify-center hover:opacity-75 transition"
          >
            <BiSearch className="text-black" size={20} />
          </Link>
        </div>

        <div className="flex justify-between items-center gap-x-4">
          {!isLoading &&
            (user ? (
              <div className="flex gap-x-4 items-center">
                <Button onClick={handleLogout} className="px-6 py-2">
                  Logout
                </Button>
                <Button onClick={() => router.push("/account")}>
                  <FaUserAlt size={20} />
                </Button>
              </div>
            ) : (
              <>
                <div>
                  <Button
                    onClick={authModal.onOpen}
                    className="
                          bg-transparent
                          text-neutral-700
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

      <div className="h-[calc(100%-64px)]">{children}</div>
    </>
  );
};

export default Header;
