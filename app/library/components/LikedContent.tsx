"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { Podcast } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedContentProps {
  podcasts: Podcast[];
}
const LikedContent = ({ podcasts }: LikedContentProps) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const authModal = useAuthModal();

  useEffect(() => {
    if (!isLoading && !user) {
      authModal.onOpen();
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (podcasts.length === 0) {
    return (
      <div
        className="
                flex
                flex-col
                w-full
                gap-y-2
                px-6
                text-neutral-400
            "
      >
        No liked podcasts.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {podcasts.map((podcast) => (
        <div key={podcast.id}
            className="flex items-center gap-x-4 w-full"
        >
            <div className="flex-1">
                <MediaItem 
                    data={podcast}

                />
            </div>
            <LikeButton 
                podcast_id={podcast.id}
                />

        </div>
      ))}
    </div>
  );
};

export default LikedContent;
