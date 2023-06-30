"use client"

import qs from "query-string"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import useDebounceValue from "@/hooks/useDebounceValue";
import Input from "./Input";

const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const debouncedValue = useDebounceValue(value, 500);

    useEffect(()=>{
        const query = {
            title: debouncedValue
        }

        const url = qs.stringifyUrl({
            url: "/search",
            query: query
        });

        router.push(url)
    }, [debouncedValue, router]);

    return (
        <Input
            placeholder="What do you want to listen to?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        >
        
        </Input>
    )
}

export default SearchInput;  