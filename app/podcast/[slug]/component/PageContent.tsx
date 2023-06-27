"use client";

import EpisodeItem from "@/components/EpisodeItem";
import { Episode } from "@/types";
import { useRef, useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PageContent = ({
  episodes,
  podcast_id,
  episodesPageCount
}: {
  episodes: Episode[];
  podcast_id: string;
  episodesPageCount: number
}) => {
  const [loadedEpisodes, setLoadedEpisodes] = useState(episodes);
  const containerRef = useRef<HTMLDivElement>(null);
  const PAGE_COUNT = episodesPageCount;
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [isLast, setIsLast] = useState(false);

  const handleScroll = () => {
    if (containerRef.current && typeof window !== "undefined") {
      const container = containerRef.current as HTMLElement;
      const { bottom } = container.getBoundingClientRect();
      const { innerHeight } = window;
      // console.log("bottom", bottom)
      // console.log("innerHeight", innerHeight)
      if (bottom <= innerHeight+100) {
        setOffset((prev) => prev + 1);
      }
    }
  };
  const handleDebouncedScroll = useCallback(debounce(() => handleScroll(), 200), [])

  useEffect(() => {

      loadMoreEpisodes(offset);

  }, [offset]);

  useEffect(() => {
    const element = document.querySelector("div#scroll-box") as HTMLDivElement;
    element!.addEventListener("scroll", handleDebouncedScroll);
    return () => {
      element!.removeEventListener("scroll", handleDebouncedScroll);
    };
  }, []);

  useEffect(()=> {
    if (isLast) {
        const element = document.querySelector("div#scroll-box") as HTMLDivElement;
        element!.removeEventListener("scroll", handleDebouncedScroll);
    }
  }, [isLast])

  const loadMoreEpisodes = async (offset: number) => {
    setIsLoading(true);
    // Every time we fetch, we want to increase
    // the offset to load fresh Episodes
    // setOffset((prev) => prev + 1);
    const newEpisodes = await fetchEpisodes(offset);
    if (newEpisodes.length === 0) {
        setIsLast(true);
    }
    // Merge new Episodes with all previously loaded
    setLoadedEpisodes((prevEpisodes) => [...prevEpisodes, ...newEpisodes]);
    setIsLoading(false);
  };

  const fetchEpisodes = async (offset: number) => {
    const from = offset * PAGE_COUNT;
    const to = from + PAGE_COUNT - 1;
    console.log ("from ", from, " to ", to)
    const { data, error } = await supabase!
      .from("episodes")
      .select("*")
      .eq("podcast_id", podcast_id)
      .order("released_date", { ascending: false })
      .range(from, to);
    console.log(error)
    console.log("returned " + data!.length + " episodes")
    return data as Episode[];
  };

  return (
    <div ref={containerRef} className="flex flex-col mt-5">
      {loadedEpisodes.map((episode, i) => {

        return (
          <motion.div
            key={episode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.25, 0, 1],
              delay: (i%PAGE_COUNT)*0.1,
            }}
          >
            <EpisodeItem key={episode.id} episode={episode} />
          </motion.div>
        );
      })}

       <div className="flex flex-row items-start justify-center h-[4rem] text-sm text-neutral-600">
       {isLoading ? (<div className="animate-pulse font-bold text-xl">
        ...
        </div>) :
       isLast ? 'You have reached the end' : ''}
        </div>
        
    </div>
  );
};

export default PageContent;
