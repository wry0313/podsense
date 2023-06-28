"use client";

import { Podcast } from "@/types";
import MediaItem from "./MediaItem";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import getPodcastById from "@/actions/getPodcastById";
import { useUser } from "@/hooks/useUser";
import LoadingDots from "./LoadingDots";

interface LibraryProps {
  pathname: string;
}
//https://github.com/supabase/supabase/blob/master/examples/auth/nextjs/app/realtime-posts.tsx
const Library = ({ pathname }: LibraryProps) => {
  const [likedPodcasts, setLikedPodcasts] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();

  const user = useUser();
  const [fetched, setFetched] = useState(false);

//https://devtrium.com/posts/async-functions-useeffect
  useEffect(() => {
    // console.log(user)
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from("liked_podcasts")
        .select("*, podcasts(*)")
        .order("created_at", { ascending: false });

      const podcastList = data?.map((item) => item.podcasts);
      setLikedPodcasts(podcastList || []);
      setIsLoading(false);
    };
    if (fetched && !user.accessToken) {
      setLikedPodcasts([]);
      setFetched(false);
    } else if (!fetched && user.accessToken) {
      fetchData();
      setFetched(true);
    }
  }, [user]);

  useEffect(() => {
    const addPodcast = async (podcast_id: string) => {
      const newLikedPodcast = await getPodcastById(podcast_id);
      setLikedPodcasts((likedPodcasts) => [...likedPodcasts, newLikedPodcast]);
    };
    const channel = supabase
      .channel("*")
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
  }, [supabase, setLikedPodcasts, likedPodcasts]);

  return (
    <div className="flex flex-col gap-y-2 mt-4 px-3 h-fit overflow-y-auto">
      {
        !user.user ? (
          <div className="flex justify-center items-center py-4 px-2 shadow-sm bg-neutral-200/20 rounded-md text-md font-semibold text-neutral-500">
          <p>Sign in to access your library</p>
        </div>
        ):
      
      isLoading ? (
        <LoadingDots />
      ) : likedPodcasts.length === 0 ? (
        <div className="flex justify-center items-center py-4 px-2 shadow-sm bg-neutral-200/20 rounded-md text-md font-semibold text-neutral-500">
          <p>Add some podcasts to your library</p>
        </div>
      ) : (
        likedPodcasts.map((podcast) => (
          <MediaItem
            data={podcast}
            key={podcast.id}
            isPodcast={true}
            active={pathname === "/podcast/" + podcast.id}
          />
        ))
      )}
    </div>
  );
};

export default Library;
