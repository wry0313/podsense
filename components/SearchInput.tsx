"use client";

import qs from "query-string";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import useDebounceValue from "@/hooks/useDebounceValue";
import Input from "./Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounceValue(value, 300);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query: query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <input
      type="search"
      placeholder="What do you want to listen to?"
      onChange={(e) => setValue(e.target.value)}
      value={value}
      className="
        flex 
        w-full 
        rounded-md 
        bg-neutral-200
        border
        border-transparent
        px-3 
        py-3 
        text-sm 
        file:border-0 
        file:bg-transparent 
        file:text-sm 
        file:font-medium 
        placeholder:text-neutral-400
        focus:outline-none"
    />
  );
};

export default SearchInput;
