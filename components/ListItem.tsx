"use client";

import { useRouter } from "next/navigation";
import Image from "next/image"; 
import { FaPlay } from "react-icons/fa";

const ListItem = ({image, name, href}:{
    image: string,
    name: string,
    href: string
}) => {
    const router = useRouter();
     
    const onClick= () => {
        // Add authenication before push
        router.push(href);
    }
    return ( 
        <button
            onClick={onClick}
            className="
            relative
            group
            flex
            items-center
            rounded-md
            overflow-hidden
            gap-x-4
            bg-neutral-100
            hover:bg-neutral-200
            transition
            pr-4
            "
        >
            <div className="
                relative
                min-h-[64px]
                min-w-[64px]
            ">
                <Image 
                    className="object-cover"
                    fill
                    src={image}
                    alt="Image"
                />
            </div>
            <p className="font-medium truncate py-5">
                {name}
            </p>
            <div className="
            absolute
            transition
            opacity-0
            rounded-full
            flex
            items-center
            justify-center
            bg-amber-300
            p-3
            drop-shadow-md
            right-5
            group-hover:opacity-100
            hover:scale-110
            ">
                <FaPlay className="text-black" />
            </div>
            
        </button>
    );
}
 
export default ListItem;