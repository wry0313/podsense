import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Podcast } from "@/types";
import getPodcasts from "./getPodcasts";


const getPodcastsByTitle = async (title: string): Promise<Podcast[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });
    
    if (!title) {
        const allPodcasts = await getPodcasts();
        return allPodcasts;
    }

    const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .ilike('title', `%${title}%`)
        .order('created_at', { ascending: false });
        
        if (error) {
            console.log(error);
        }

        return (data as Podcast[]) || [];
}

export default getPodcastsByTitle;