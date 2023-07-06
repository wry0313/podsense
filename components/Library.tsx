"use client";

import { Podcast } from "@/types";
import MediaItem from "./MediaItem";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import LoadingDots from "./LoadingDots";
import LikeButton from "./LikeButton";

interface LibraryProps {
  pathname?: string;
  showLiked?: boolean;
  channelName: string;
}

//https://github.com/supabase/supabase/blob/master/examples/auth/nextjs/app/realtime-posts.tsx
const Library = ({ pathname, showLiked = false, channelName}: LibraryProps) => {
  const [likedPodcasts, setLikedPodcasts] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  const {user, isLoadingUser} = useUser();
  const [fetched, setFetched] = useState(false);


//https://devtrium.com/posts/async-functions-useeffect
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if(user) {
        const { data } = await supabase
        .from("liked_podcasts")
        .select("*, podcasts(id, title, host, image_url)")
        .order("created_at", { ascending: false });

      const podcastList = data?.map((item) => item.podcasts);
      setLikedPodcasts(podcastList || []);
      }
      setIsLoading(false);
    };
    if (fetched && !user) {
      setLikedPodcasts([]);
      setFetched(false);
    } else if (!fetched && user) {
      fetchData();
      setFetched(true);
    }
  }, [user, fetched, supabase]);

  useEffect(() => {
    const addPodcast = async (newPodcastId : string) => {
      const {data} = await supabase
      .from('podcasts')
      .select('*')
      .eq('id', newPodcastId)
      .single();

      setLikedPodcasts((likedPodcasts) => [data, ...likedPodcasts]);
    };
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "liked_podcasts" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            addPodcast(payload.new.podcast_id);
          } else if (payload.eventType === "DELETE") {

            setLikedPodcasts((prevPodcasts) =>
              prevPodcasts.filter((p) => p.id !== payload.old.podcast_id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setLikedPodcasts, likedPodcasts, channelName]);

  return (
    <div className="flex flex-col gap-y-2 mt-4 px-3 h-fit overflow-y-auto">
      {
        (!user && !isLoadingUser) ? (
          <div className="flex justify-center items-center py-4 px-2 shadow bg-neutral-100 dark:bg-dark-100 rounded-md text-md font-semibold text-neutral-500 dark:text-dark-500">
          <p>Sign in to access your library</p>
        </div>
        ) :
      
      isLoading ? (
        <LoadingDots />
      ) : likedPodcasts.length === 0 ? (
        <div className="flex justify-center items-center py-4 px-2 shadow bg-neutral-100 dark:bg-dark-100 rounded-md text-md font-semibold text-neutral-500 dark:text-dark-500">
          <p>Add some podcasts to your library</p>
        </div>
      ) : !showLiked ? (
        likedPodcasts.map((podcast) => (
         <div 
         key={podcast.id}
         className="overflow-hidden">
           <MediaItem
            data={podcast}
            isPodcast={true}
            active={pathname === "/podcast/" + podcast.id}
          />
         </div>
          
        ))
      ) : (
        likedPodcasts.map((podcast) => (
          <div 
          key={podcast.id}
              className="flex items-center gap-x-4 w-full"
          >
              <div className="flex-1">
                  <MediaItem 
                      data={podcast}
                      isPodcast={true}
                  />
              </div>
              <LikeButton 
                  podcast_id={podcast.id}
                  defaultIsLiked={true}
                  />
  
          </div>
        ))
      )}
    </div>
  );
};

export default Library;
