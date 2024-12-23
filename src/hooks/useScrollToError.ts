import { useEffect, useRef } from "react";

/** This hook will scroll to certain error when the validation error
 * occurs on a page using react-hook-form */
const useScrollToError = (errors: any) => {
  const firstErrRef = useRef<HTMLParagraphElement>(null);
  return useEffect(() => {
    if (firstErrRef.current) {
      firstErrRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [errors]);
};

export default useScrollToError;
