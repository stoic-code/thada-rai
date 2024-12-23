import { useEffect } from "react";

/** This hook prevents user accidently
 exiting a dirty form without submitting
*/
export const useBeforeUnload = (isDirty: boolean) => {
  return useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        // Display a confirmation message
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message; // Standard for most browsers
        return message; // For some older browsers
      }
    };

    // Attach event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);
};
