"use client";

import EpisodeItem from "@/components/EpisodeItem";
import { Episode } from "@/types";
import { useRef, useState, useEffect, useCallback, memo } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import ScrollTopButton from "@/components/ScrollTopButton";
import { useDebounce } from "@/hooks/useDebounce";

const MemoEpisodeItem = memo(EpisodeItem);

const PageContent = ({
  podcast_id,
  episodesDesc,
  episodesAsc,
  pageCount
}: {
  podcast_id: string;
  episodesDesc: Episode[];
  episodesAsc: Episode[];
  pageCount: number
}) => {

  const supabase = createClientComponentClient();
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(1);
  const [loadedEpisodes, setLoadedEpisodes] = useState(episodesDesc);
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [sortAscending, setSortAscending] = useState(false);
  const [isBottom, setIsBottom] = useState(false); //hard code to true to trigger first time render

  useEffect(() => {
    const element = document.querySelector("div#scroll-box") as HTMLDivElement;
    element!.addEventListener("scroll", handleDebouncedScroll);
    return () => {
      element!.removeEventListener("scroll", handleDebouncedScroll);
    };
  }, []);

  const handleScroll = () => {
    if (containerRef.current && typeof window !== "undefined") {
      const container = containerRef.current as HTMLElement;
      const { bottom } = container.getBoundingClientRect();
      const { innerHeight } = window;
      setIsBottom(bottom <= innerHeight + 100);
    }
  };

  useEffect(() => {
    if (isBottom && !isLoading) {
      loadMoreEpisodes(offset);
      setIsBottom(false);
    }
  }, [isBottom]);

  const handleDebouncedScroll = useCallback(
    useDebounce(() => handleScroll(), 200),
    []
  );

  useEffect(() => {
    if (isLast) {
      const element = document.querySelector(
        "div#scroll-box"
      ) as HTMLDivElement;
      element!.removeEventListener("scroll", handleDebouncedScroll);
    }
  }, [isLast]);

  const loadMoreEpisodes = async (offset: number) => {
    setIsLoading(true);
    // Every time we fetch, we want to increase
    // the offset to load fresh Episodes
    const newEpisodes = await fetchEpisodes(offset);

    setOffset((prev) => prev + 1);

    if (newEpisodes && newEpisodes.length === 0) {
      setIsLast(true);
    }
    // Merge new Episodes with all previously loaded
    setLoadedEpisodes((prevEpisodes) => [...prevEpisodes, ...newEpisodes]);
    setIsLoading(false);
  };

  const fetchEpisodes = async (offset: number) => {
    const from = offset * pageCount;
    const to = from + pageCount - 1;
    
    const { data } = await supabase
      .from("episodes")
      .select(
        "id, title, released_date, description, duration, audio_url, image_url, processed"
      )
      .eq("podcast_id", podcast_id)
      .range(from, to)
      .order("released_date", { ascending: sortAscending });

    return data as Episode[];
  };

  const toggleSort = () => {
    // betng at the button will trigger one and setisBottom will triger another time
    if (sortAscending) {
      setLoadedEpisodes(episodesDesc);
    } else {
      setLoadedEpisodes(episodesAsc);
    }
    setIsBottom(false); // hard code to trigger a load
    setOffset(1);
    setIsLast(false);
    setSortAscending(!sortAscending);
    setIsLoading(false);
  };

  return (
    <div ref={containerRef} className="flex flex-col mt-5">
      <ScrollTopButton />
      <button
        aria-label="sort by time"
        onClick={toggleSort}
        className="px-4 py-2 font-bold w-fit text-sm mb-4 bg-neutral-100 dark:bg-dark-100 hover:scale-105 transition rounded-lg"
      >
        {sortAscending ? "Earlist to lastest" : "Latest to earliest"}
      </button>

      {loadedEpisodes.map((episode, i) => {
        return <MemoEpisodeItem episode={episode} key={i} />;
      })}

      <div className="flex flex-row items-start justify-center h-[4rem] text-sm text-neutral-600 dark:text-dark-600">
        {isLoading ? (
          <div className="animate-pulse font-bold text-xl">...</div>
        ) : isLast ? (
          "You have reached the end"
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PageContent;
