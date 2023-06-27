import { Podcast } from "@/types";
import getPodcasts from "./getPodcasts";

import supabase from "./getSupabaseClient";

const getPodcastsByTitle = async (title: string): Promise<Podcast[]> => {
  if (!title) {
    const allPodcasts = await getPodcasts();
    return allPodcasts;
  }

  const { data, error } = await supabase
    .from("podcasts")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as Podcast[]) || [];
};

export default getPodcastsByTitle;
