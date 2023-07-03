"use client";

import { Episode } from "@/types";
import Image from "next/image";
import { useState } from "react";

export default function ChatWindow({episode} : {episode: Episode}) {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<String>("");

  const generateResponse = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setResponse("");
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: input,
        tokenBudget: 1000,
        namespace: episode.id
      }),
    });

    if (!response.ok) {
      console.error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setResponse((prev) => prev + chunkValue);
    }
    setLoading(false);
  };

  return (
    <div className="w-full">
      <p className="text-2xl font-bold text-neutral-900 dark:text-dark-900 mb-2">
        Hello! I am {episode.host} AI. I can answer your questions base on the specifics details of this episode.
      </p>
      <div className="flex flex-row gap-x-6">
      <div className="relative h-20 w-20 lg:h-32 lg:w-32 flex-none">
            <Image
              src={episode.image_url}
              alt="Episode cover image"
              sizes="(min-width: 1024px) 224px, 128px"
              quality={100}
              className="object-cover rounded-full shadow-md"
              fill
            />
        </div>
        
     <div className="w-full">
     <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        maxLength={200}
        className="focus:ring-neu w-full rounded-md border border-neutral-400 outline-none
         p-4 text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-500 dark:placeholder-text-dark-400 dark:focus:border-dark-400 dark:border-dark-300 dark:bg-dark-200 dark:text-dark-900"
        placeholder={"e.g. What are Dr. Huberman's protocals to sleeping better?"}
      />
      {!loading ? (
        <button
        aria-label='generate response'
          className="w-32 rounded-xl bg-neutral-900 dark:bg-dark-200 px-4 py-2 font-medium text-white hover:bg-black/80"
          onClick={(e) => generateResponse(e)}
        >
          Ask &rarr;
        </button>
      ) : (
        <button
          disabled
          aria-label='loading'
          className=" w-32 rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white"
        >
          <div className="animate-pulse font-bold tracking-widest">...</div>
        </button>
      )}
      {response && (
        <div className="mt-2 rounded-xl border bg-white dark:border-dark-200 dark:bg-dark-200 p-4 shadow-md transition hover:bg-gray-100">
          {response}
        </div>
      )}
     </div>
      </div>
    </div>
  );
}
