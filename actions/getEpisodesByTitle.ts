import { Episode } from "@/types";
import supabase from "./getSupabaseClient";

const getEpisodesByTitle = async (title: string): Promise<Episode[]> => {
  if (!title) {
    return []
  }

  const { data, error } = await supabase
    .from("episodes")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error)
    return []
  }

  return (data as Episode[]);
};

export default getEpisodesByTitle;
