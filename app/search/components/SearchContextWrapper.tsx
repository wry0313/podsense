
import getPodcastsByTitle from "@/actions/getPodcastsByTitle";
import SearchContent from "./SearchContent";


const SearchContentWrapper = async ({
    title
}:{
    title: string
}) => {
    const podcasts = await getPodcastsByTitle(title)

    return ( 
        <SearchContent podcasts={podcasts} />
     );
}
 
export default SearchContentWrapper;