import { RefObject, useState } from "react";

export const useFullScreen = (ref: RefObject<HTMLDivElement>) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullScreen = () => {
    if (ref.current) {
      if (document.fullscreenElement) {
        // If fullscreen mode is active, exit fullscreen
        document.exitFullscreen().then(() => setIsFullscreen(false));
      } else {
        // If not in fullscreen mode, request fullscreen for the div
        ref.current
          .requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch((err) => {
            console.error("Error attempting to enable fullscreen:", err);
          });
      }
    }
  };

  return { isFullscreen, toggleFullScreen };
};
