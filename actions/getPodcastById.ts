import { Podcast } from "@/types";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPodcastById = async (id: string): Promise<Podcast> => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const { data } = await supabase
    .from("podcasts")
    .select("*")
    .eq("id", id)
    .single();

  return (data as any) || null;
};

export default getPodcastById;
