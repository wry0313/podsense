"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { HiHome } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"
import Button from "./Button";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const handleLogout = () => {
    // Handle logout in the future
  };
  return (
    <div
      className={twMerge(
        `
        h-fit
        bg-gradient-to-b 
        from-neutral-50 
        p-6
        
        `,
        className
      )}
    >
        <div className="
            w-full
            mb-4
            flex
            items-center
            justify-between
        ">
            <div className="
                hidden
                md:flex
                gap-x-2
                items-center
            ">
                <button
                className="rounded-full bg-neutral-100 flex items-center justify-center hover:opacity-75 transition"
                onClick={() => router.back()}
                >
                <RxCaretLeft size={35}/>
                </button>
                <button
                className="rounded-full bg-neutral-100 flex items-center justify-center hover:opacity-75 transition"
                onClick={() => router.forward()}
                >
                <RxCaretRight size={35}/>
                </button>
            </div>

            <div className="flex md:hidden gap-x-2 items-center">
                <button className="rounded-full p-2 bg-neutral-50 flex items-center justify-center hover:opacity-75 transition">
                    <HiHome className="text-black" size={20}/>
                </button>
                <button className="rounded-full p-2 bg-neutral-50 flex items-center justify-center hover:opacity-75 transition">
                    <BiSearch className="text-black" size={20}/>
                </button>
            </div>
            
            <div className="flex justify-between items-center gap-x-4">
                <>
                    <div>
                        <Button
                        onClick={()=>{}}
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
                        <Button
                        onClick={()=>{}}
                        className="
                            px-6 py-2
                        "
                        >
                            Log in
                        </Button>
                    </div>
                </>
            </div>
        </div>
        {children}
    </div>
  );
};

export default Header;
