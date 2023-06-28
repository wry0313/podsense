import getPodcastsByTitle from "@/actions/getPodcastsByTitle";
import SearchContent from "./SearchContent";
import getEpisodesByTitle from "@/actions/getEpisodesByTitle";

async function fetchPodcasts(title: string) {
    return await getPodcastsByTitle(title)
}

async function fetchEpisodes(title: string) {
    return await getEpisodesByTitle(title)
}

const SearchContentWrapper = async ({
    title
}:{
    title: string
}) => {
    const podcastsData = fetchPodcasts(title)
    const episodeData = fetchEpisodes(title)

    const [podcasts, episodes] = await Promise.all([podcastsData, episodeData])
    return ( 
        <SearchContent podcasts={podcasts} episodes={episodes} query={title} />
     );
}
 
export default SearchContentWrapper;