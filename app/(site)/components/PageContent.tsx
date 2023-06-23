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
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4 
        mt-4
      "
    >
      {podcasts.map((podcast) => (
        <PodcastItem
          key={podcast.id} 
          podcast={podcast}
        />
      ))}
    </div>
    );
}
 
export default PageContent;