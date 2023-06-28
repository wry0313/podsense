import { twMerge } from "tailwind-merge";

const LoadingDots = ({className} : {className? : string}) => {
  return (
    <div className={twMerge("flex justify-center items-center h-16", className)}>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse mx-1"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse mx-1"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse mx-1"></div>
    </div>
  );
};

export default LoadingDots;
