"use client";

import { Episode } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import PlayButton from "@/components/PlayButton";
import ChatWindow from "@/components/ChatWindow";

interface PageContentProps {
  episode: Episode;
}
const PageContent: React.FC<PageContentProps> = ({ episode }) => {
  const onPlay = useOnPlay([episode]);

  return (
    <div>
      <PlayButton
        onClick={() => onPlay(episode.id)}
        className="opacity-100 w-fit mb-10"
      />
      
      <div className="mb-[10rem]">
      <ChatWindow /> 
      </div>
    </div>
  );
};

export default PageContent;
