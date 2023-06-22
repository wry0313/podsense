"use client"

import PodcastItem from "@/components/PodcastItem";
import { Podcast } from "@/types"

interface PageContentProps {
    podcasts: Podcast[];
}
const PageContent: React.FC<PageContentProps> = ({
    podcasts
}) => {
    if (podcasts.length === 0) {
        return (
            <div className="mt-4 text-neutral-700">
                No podcasts available.
            </div>
        )
    }
    return ( 
        <div 
      className="
        grid 
        grid-cols-2
        sm:grid-cols-2
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-8
        gap-4 
        mt-4
      "
    >
      {podcasts.map((item) => (
        <PodcastItem
          onClick={() => {}} 
          key={item.title} 
          data={item}
        />
      ))}
    </div>
    );
}
 
export default PageContent;