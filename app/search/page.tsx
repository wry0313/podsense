
import SearchInput from "@/components/SearchInput";

import { Suspense } from "react";
import { BounceLoader } from "react-spinners";
import SearchContentWrapper from "./components/SearchContextWrapper";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0


const Search = ({ searchParams }: SearchProps) => {
  return (
    <div
      className="
                bg-white
                rounded-lg
                h-fit
                w-full
                overflow-hidden
                overflow-y-auto
                flex
                flex-col
            "
    >

      <div className="px-6 mb-2 flex flex-col gap-y-6">
        <h1 className="text-black text-3xl font-semibold">Search</h1>
        <SearchInput />
      </div>

      <Suspense
        fallback={
          <div className="h-full flex items-center justify-center">
      <BounceLoader speedMultiplier={1.5} color="gray" size={100} />
    </div>
        }
      >
        <SearchContentWrapper title={searchParams.title} />
      </Suspense>
    </div>
  );
};

export default Search;
