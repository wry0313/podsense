"use client";

import { Episode } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import PlayButton from "@/components/PlayButton";

interface PageContentProps {
  episode: Episode;
}
const PageContent: React.FC<PageContentProps> = ({ episode }) => {
  const onPlay = useOnPlay([episode]);

  return (
    <div>
      <PlayButton
        onClick={() => onPlay(episode.id)}
        className="opacity-100 w-fit "
      />
    </div>
  );
};

export default PageContent;
