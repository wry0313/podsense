import { IconType } from "react-icons";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    active,
    href
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
            w-full
            gap-x-4
            text-md
            font-medium
            cursor-pointer
            hover:text-indigo-700
            transition
            text-neutral-400
            py-1
            `,
            active && "text-indigo-700"
            )}
            >
                <Icon size={26}></Icon>
                <p className="truncate w-full">{label}</p>
            </Link>
        </div>
     );
}
 
export default SidebarItem;