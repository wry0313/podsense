
import SearchInput from "@/components/SearchInput";

import { Suspense } from "react";
import SearchContent from "./components/SearchContext";
import LoadingDots from "@/components/LoadingDots";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

const Search = ({ searchParams }: SearchProps) => {
  return (
    <div
      className="
                h-full
                w-full
                overflow-hidden
                overflow-y-auto
                flex
                flex-col
                "
    >

      <div className="px-6 mb-2 flex flex-col gap-y-6">
        <h1 className="text-3xl font-semibold">Search</h1>
        <SearchInput />
      </div>

      <Suspense
        fallback={
          <LoadingDots className="h-full"/>
        }
      >
        <SearchContent title={searchParams.title} />
      </Suspense>
    </div>
  );
};

export default Search;
