"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ToastNotification = ({text} : {text:string}) => {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!shown) {
      setShown(true)
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <p className="mt-1 text-sm text-gray-500">
              {text}
            </p>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              aria-label='dismiss'
              onClick={() => toast.dismiss()}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-amber-400 hover:text-amber-300 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      ));
    }
  }, []);
  return <></>;
};

export default ToastNotification;
