"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";

const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // prevent model causing hydration error in server side rendering
    // we never want to render model if we are in server side rendering
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // this is our way of knowing whatever is being rendered right now is in server side
    return null;
  }
  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};

export default ModelProvider;
