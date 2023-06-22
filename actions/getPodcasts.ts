import { Podcast } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPodcasts = async (): Promise<Podcast[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .order('created_at', { ascending: false });
        
        if (error) {
            console.log(error);
        }

        return (data as any) || [];
}

export default getPodcasts;