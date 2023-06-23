"use client"
import LikeButton from "@/components/LikeButton";
import MiniPodcastItem from "@/components/MiniPodcastItem";
import { Podcast } from "@/types";

const SearchContent = ({ 
    podcasts
} : { 
    podcasts: Podcast[]
}) => {

    if (podcasts.length === 0) {
        return (
            <div
                className="
                flex
                flex-col
                gap-y-2
                w-full
                px-6
                text-neutral-600
                "
            >
                No podcasts found.
            </div>
        )
    }

    return (
        <div
            className="flex flex-col gap-y-2 w-full px-6 overflow-y-auto h-full"
        >
            {podcasts.map((podcast) => (
                <div
                    key={podcast.id}
                    className="flex items-center gap-x-4 w-full"
                >
                    <div className="flex-1">
                        <MiniPodcastItem
                            podcast={podcast}
                        />
                    </div>
                    <LikeButton podcast_id={podcast.id}/>
                </div>
            ))}
        </div>
    )
}

export default SearchContent;