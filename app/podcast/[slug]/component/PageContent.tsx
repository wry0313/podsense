"use client";

import EpisodeItem from "@/components/EpisodeItem";
import { Episode } from "@/types";
import { useRef, useState, useEffect, useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import ScrollTopButton from "@/components/ScrollTopButton";
import { useDebounce } from "@/hooks/useDebounce";

const PageContent = ({ podcast_id }: { podcast_id: string }) => {
  const supabase = createClientComponentClient();
  const PAGE_COUNT = 50;
  const [loadedEpisodes, setLoadedEpisodes] = useState([] as Episode[]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);

  const [sortAscending, setSortAscending] = useState(false);
  const [isBottom, setIsBottom] = useState(true); //hard code to true to trigger first time render

  useEffect(() => {
    const element = document.querySelector("div#scroll-box") as HTMLDivElement;
    element!.addEventListener("scroll", handleDebouncedScroll);
    return () => {
      element!.removeEventListener("scroll", handleDebouncedScroll);
    };
  }, []);

  const handleScroll = () => {
    // console.log("scroll")
    if (containerRef.current && typeof window !== "undefined") {
      const container = containerRef.current as HTMLElement;
      const { bottom } = container.getBoundingClientRect();
      const { innerHeight } = window;
      // console.log(bottom, innerHeight)
      setIsBottom(bottom <= innerHeight + 100);
    }
  };

  useEffect(() => {
    // console.log("is Bottom change deteced: " + isBottom)
    // console.log("what is isloading: " + isLoading)
    if (isBottom && !isLoading) {
      // console.log("loading more")
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
      // console.log("REMOVE SCROLL")
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
    // console.log("set is loading false")
    setIsLoading(false);
  };

  const fetchEpisodes = async (offset: number) => {
    // console.log(offset)
    const from = offset * PAGE_COUNT;
    let to = from + PAGE_COUNT - 1;
    // console.log(from, to)
    const { data } = await supabase!
      .from("episodes")
      .select("id, title, released_date, description, duration, audio_url, image_url, processed")
      .eq("podcast_id", podcast_id)
      .range(from, to)
      .order("released_date", { ascending: sortAscending });

    return data as Episode[];
  };

  const toggleSort = () => {
    // betng at the button will trigger one and setisBottom will triger another time

    setIsBottom(true); // hard code to trigger a load
    setOffset(0);
    setIsLast(false);
    setSortAscending(!sortAscending);
    setLoadedEpisodes([]);
    setIsLoading(false);
  };

  return (
    <div ref={containerRef} className="flex flex-col mt-5">
      <ScrollTopButton />
      <button
        aria-label='sort by time'
        onClick={toggleSort}
        className="px-4 py-2 font-bold w-fit text-sm mb-4 text-black bg-neutral-100 hover:scale-105 transition rounded-lg"
      >
        {sortAscending ? "Earlist to lastest" : "Latest to earliest"}
      </button>

      {loadedEpisodes.map((episode, i) => {
        return (
            <EpisodeItem  episode={episode} key={i}/>
        );
      })}

      <div className="flex flex-row items-start justify-center h-[4rem] text-sm text-neutral-600">
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
