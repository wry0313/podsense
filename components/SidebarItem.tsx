import { IconType } from "react-icons";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
    icon?: IconType;
    label: string;
    active?: boolean;
    href: string;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    active = false,
    href,
}) => {
    return ( 
        <div>
            <Link
            href={href}
            className={twMerge(`
            flex
            flex-row
            h-auto
            items-center
            gap-x-4
            text-md
            font-medium
            cursor-pointer
            hover:text-black
            hover:bg-neutral-400/5
            rounded-md
            transition
            text-neutral-400
            py-1
            px-2
            mx-3    
            mt-4
            `,
            active && "text-black bg-neutral-400/5"
            )}
            >
                {Icon&&<Icon size={30}></Icon>}
                <h1 className="truncate w-full">{label}</h1>
            </Link>
        </div>
     );
}
 
export default SidebarItem;