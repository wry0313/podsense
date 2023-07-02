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
    .select("id, title, host, image_url")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    return []
  }

  return (data as Podcast[]);
};

export default getPodcastsByTitle;
