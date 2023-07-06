import { Json } from "@/types_db";
import { convertSecondsToHMS } from "@/utils/timeUtils";
import SeekButton from "./seekButton";

const Transcript = ({ transcript, episode_id, podcast_id }: { transcript: Json[], episode_id : string, podcast_id: string}) => {
  const transcriptObj = JSON.parse(transcript?.toString() || '{}');
  return (
    <div>
      {transcriptObj.map((item: any, index: number) => {
        return (
          <div key={index}>
            <p className="text-md mt-3 ">
              {item?.text}
            </p>
            <p className="text-md mt-3 ">
              {convertSecondsToHMS(item?.start)}
            </p>
            <SeekButton 
              seekTime={item?.start}
              episode_id={episode_id}
              podcast_id={podcast_id}
              />
          </div>
        );
      })}
    </div>
  );
};

export default Transcript;
