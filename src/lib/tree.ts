import { useCallback, useState } from "react";

export const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const [dimention, setDimention] = useState({ height: 0, width: 0 });
  const containerRef = useCallback((containerElem: HTMLDivElement | null) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 8 });
      setDimention({ height: height / 5, width });
    }
  }, []);
  return { translate, containerRef, dimention } as const;
};
