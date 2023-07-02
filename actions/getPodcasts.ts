import { Podcast } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPodcasts = async (): Promise<Podcast[]> => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const { data } = await supabase
    .from("podcasts")
    .select("id, title, host, image_url")
    .order("created_at", { ascending: true });

  return (data as Podcast[]) || [];
};

export default getPodcasts;
