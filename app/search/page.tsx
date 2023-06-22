import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";
import getPodcastsByTitle from "@/actions/getPodcastsByTitle";
import { Suspense } from "react";
import Loading from "./loading";

interface SearchProps {
    searchParams: {
        title: string;
    }
}

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
    const podcasts = await getPodcastsByTitle(searchParams.title)
    return (
        <div
            className="
                bg-neutral-100
                rounded-lg
                h-full
                w-full
                overflow-hidden
                overflow-y-auto
                flex
                flex-col
            "
        >
            <Header>
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-black text-3xl font-semibold">
                        Search
                    </h1>
                    <SearchInput />
                </div>
            </Header>


            <SearchContent podcasts={podcasts} />

        </div>
    )
}

export default Search;