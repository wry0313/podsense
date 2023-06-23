import { Podcast } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react"

const useLoadImage = (podcast: Podcast) => {
    if (!podcast.cover_image_path) {
        return "";
    }

    const supabaseClient = useSupabaseClient();

    const { data: imageData } = supabaseClient
    .storage.from('images').getPublicUrl(podcast.cover_image_path);

    return imageData.publicUrl;
}

export default useLoadImage;