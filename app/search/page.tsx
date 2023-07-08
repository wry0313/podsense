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
    <>
      <div className="mb-2 flex flex-col gap-y-6">
        <h1 className="text-3xl font-semibold">Search</h1>
        <SearchInput />
      </div>

      <Suspense fallback={<LoadingDots />}>
        <SearchContent title={searchParams.title} />
      </Suspense>
    </>
  );
};

export default Search;
