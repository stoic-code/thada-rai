"use client";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function NoticeOverlay({ imgUrl }: { imgUrl: any }) {
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    // Check local storage to see if the popup has been shown before
    const noticeRead = sessionStorage.getItem("noticeRead");

    // If not, show the popup and set the local storage flag
    if (!noticeRead) {
      setOverlay(true);
    }
  }, []);
  function handleExit() {
    sessionStorage.setItem("noticeRead", "true");
    setOverlay(false);
  }
  return (
    <div>
      <AnimatePresence>
        {overlay && (
          <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { type: "just" } }}
            exit={{ y: -200, opacity: 0 }}
            className=" fixed z-[1000] top-0 h-screen w-full bg-black/90"
          >
            <button onClick={() => handleExit()}>
              <X size={32} className=" fixed right-3 top-3 z-50 text-white" />
            </button>
            <div className=" fixed inset-0   h-full w-full flex items-center justify-center overflow-auto">
              <img
                src={imgUrl}
                alt="photo"
                className="  max-h-screen max-w-[100vw] p-8"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
