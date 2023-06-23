"use client";

import { BounceLoader } from "react-spinners";

const Loading = () => {
  return ( 
    <div className="h-fit flex items-center justify-center">
      <BounceLoader color="gray" size={100} />
    </div>
  );
}
 
export default Loading;