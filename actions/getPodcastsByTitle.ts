import { Podcast } from "@/types";
import getPodcasts from "./getPodcasts";

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
