// "use client";
import Link from "next/link";
import { Minimize, Maximize } from "lucide-react";
import { usePathname } from "next/navigation";
import { Network } from "lucide-react";
import { useState } from "react";

const Tools = ({
  isFullscreen,
  toggleFullscreen,
  textTreeRoute,
}: {
  isFullscreen: boolean;
  textTreeRoute?: string;
  toggleFullscreen: () => void;
}) => {
  const pathname = usePathname();
  // const isChartpath = pathname === "/family" || "/family/text";
  const [chartToggle, setChartToggle] = useState(false);
  return (
    <>
      <Link
        onClick={() => {
          if (pathname === "/family") {
            setChartToggle(true);
          } else {
            setChartToggle(false);
          }
        }}
        href={
          chartToggle && textTreeRoute
            ? textTreeRoute
            : chartToggle && !textTreeRoute
            ? "/family/text"
            : "/family"
        }
        title="Text Version Family Tree"
        className="my-auto text-sm"
      >
        {chartToggle ? <Network size={20} /> : "TXT"}
      </Link>
      <button onClick={toggleFullscreen}>
        {isFullscreen ? (
          <Minimize
            size={20}
            className="transition-all duration-200 hover:scale-125"
          />
        ) : (
          <Maximize
            size={20}
            className="transition-all duration-200 hover:scale-125"
          />
        )}
      </button>
    </>
  );
};

export default Tools;
