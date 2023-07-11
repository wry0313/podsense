"use client";

import { Episode, EpisodeClipMetadata, Message } from "@/types";
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatWindow({ episode }: { episode: Episode }) {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [episodeMetadata, setEpisodeMetadata] =
    useState<EpisodeClipMetadata[]>();
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      isUser: false,
      text:
        "Hey there! I'm " +
        episode.host +
        " AI. I am here to help you answer any question about this episode!",
    },
  ]);

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatHistory.length > 1) {
      const scrollableDiv = scrollableDivRef.current;
      if (scrollableDiv) {
        scrollableDiv.scrollTo({
          top: scrollableDiv.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [chatHistory, loading]);

  const generateResponse = async () => {
    setLoading(true);
    if (!input) {
      return;
    }
    setInput("");

    const apiResponse = await fetch("/api/episode_query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: input,
        episode_id: episode.id,
        host: episode.host,
        title: episode.title,
      }),
    });

    if (!apiResponse.ok) {
      console.error(apiResponse.statusText);
    }

    // This data is a ReadableStream
    const data = apiResponse.body;
    if (!data) {
      return;
    }
    setChatHistory((prev) => [...prev, { isUser: false, text: "" }]);

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let metadataIsLoaded = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();

      if (!metadataIsLoaded) {
        metadataIsLoaded = true;
        const chunk = decoder.decode(value);
        const splitChunk = chunk.split("\n");
        const metadataJson: EpisodeClipMetadata[] = JSON.parse(splitChunk[0]);
        setEpisodeMetadata(metadataJson);
        setChatHistory((prevChatHistory) => {
          const updatedChatHistory = [...prevChatHistory];
          const lastMessageIndex = updatedChatHistory.length - 1;
          updatedChatHistory[lastMessageIndex] = {
            ...updatedChatHistory[lastMessageIndex],
            text: updatedChatHistory[lastMessageIndex].text + splitChunk[1],
          };
          return updatedChatHistory;
        });
        continue;
      }

      done = doneReading;
      const chunkValue = decoder.decode(value);
      setChatHistory((prevChatHistory) => {
        const updatedChatHistory = [...prevChatHistory];
        const lastMessageIndex = updatedChatHistory.length - 1;
        updatedChatHistory[lastMessageIndex] = {
          ...updatedChatHistory[lastMessageIndex],
          text: updatedChatHistory[lastMessageIndex].text + chunkValue,
        };
        return updatedChatHistory;
      });
    }
    setLoading(false);
  };

  const handleAsk = async () => {
    if (input) {
      setChatHistory((prev) => [...prev, { isUser: true, text: input }]);
      generateResponse();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleAsk();
    }
  };

  return (
    <div className="w-full bg-neutral-100 dark:bg-dark-100 rounded-lg p-5 pb-1 shadow">
      <div
        ref={scrollableDivRef}
        id="hide-scrollbar"
        className="overflow-y-auto h-[20rem] rounded-md"
      >
        {chatHistory &&
          chatHistory.map((msg, i) => (
            <ChatMessage key={i} message={msg} image_url={episode.image_url!} />
          ))}
      </div>

      <div>
        <div className="flex flex-row gap-x-2 my-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={200}
            className="w-full rounded-md  outline-none
         p-3 text-neutral-900 shadow placeholder:text-neutral-400 dark:placeholder-text-dark-400 dark:focus:border-dark-400  dark:bg-dark-200 dark:text-dark-900"
            placeholder={
              "e.g. What are Dr. Huberman's protocals to sleeping better?"
            }
          />
          {!loading ? (
            <button
              aria-label="generate response"
              className="w-32 rounded-xl bg-neutral-900 dark:bg-dark-200 px-4 py-2 font-medium text-white hover:bg-black/80"
              onClick={handleAsk}
            >
              Ask &rarr;
            </button>
          ) : (
            <button
              disabled
              aria-label="loading"
              className=" w-32 rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white"
            >
              <div className="animate-pulse font-bold tracking-widest">...</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
