import { Message } from "@/types";
import Image from "next/image";
import { open_sans } from "@/app/fonts";

const ChatMessage = ({
  message,
  image_url,
}: {
  message: Message;
  image_url: string;
}) => {
  return (
    <div
      className={`px-4 py-3 mb-3 bg-white dark:bg-dark-200 break-words w-fit flex ${
        message.isUser ? "flex-row-reverse ml-auto" : "flex-row"
      } shadow rounded-2xl`}
    >
      {message.isUser ? (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height={28}
          width={28}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"></path>
        </svg>
      ) : (
        <Image
          className="rounded-full h-fit"
          src={image_url}
          alt={message.isUser ? "my-user-profile" : "user-profile"}
          width={30}
          height={30}
        />
      )}
      <span className={`${message.isUser ? "mr-3" : "ml-3"} max-w-[45rem]  text-lg whitespace-pre-line break-words ` + open_sans.className}>{message.text}</span>
    </div>
  );
};

export default ChatMessage;
