import { useEffect, useMemo, useState } from "react";

import { Episode } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";

const useGetEpisodeById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [episode, setEpisode] = useState<Episode | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    const fetchEpisode = async () => {
      const { data, error } = await supabaseClient
        .from("episodes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return toast.error(error.message);
      }

      setEpisode(data as Episode);
      setIsLoading(false);
    };

    fetchEpisode();
  }, [id, supabaseClient]);

  return useMemo(
    () => ({
      isLoading,
      episode,
    }),
    [isLoading, episode]
  );
};

export default useGetEpisodeById;


/**
On the initial render, useMemo returns the result of calling calculateValue with no arguments.
During next renders, it will either return an already stored value from the last render (if the dependencies haven’t changed), or call calculateValue again, and return the result that calculateValue has returned.
 */