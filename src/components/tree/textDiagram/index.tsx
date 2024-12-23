"use client";
import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import Tools from "../Tools";
import { Locate } from "lucide-react";
import { cn } from "@/lib/utils";

const stepPathFunc = (linkDatum: any, orientation: any) => {
  const { source, target } = linkDatum;
  const deltaY = target.y - source.y;
  const arrowHeadSize = 5;
  return orientation === "horizontal"
    ? `M${source.y},${source.x} H${source.y + deltaY / 2} V${target.x} H${
        target.y
      }`
    : `M${source.x},${source.y + 8} V${source.y + deltaY / 2 - 8} H${
        target.x
      } V${target.y - 25} L${target.x - arrowHeadSize},${
        target.y - 25 - arrowHeadSize
      } M${target.x},${target.y - 25} L${target.x + arrowHeadSize},${
        target.y - 25 - arrowHeadSize
      }`;
};

type TPageProps = {
  data: any;
  user: any;
};

export default function TextFamilyChart({ data }: TPageProps) {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dimentions, setDimentions] = useState({ height: 0, width: 0 });

  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (containerRef.current) {
      const { height, width } = containerRef.current.getBoundingClientRect();
      setDimentions({ height: height / 2, width });
      setTranslate({ x: width / 2, y: height / 10 });
    }
  }, []);

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!(
          document.fullscreenElement || //@ts-ignore
          document.webkitFullscreenElement || //@ts-ignore
          document.mozFullScreenElement || //@ts-ignore
          document.msFullscreenElement
        )
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        // If fullscreen mode is active, exit fullscreen
        document.exitFullscreen();
      } else {
        // If not in fullscreen mode, request fullscreen for the div
        containerRef.current.requestFullscreen().catch((err) => {
          console.error("Error attempting to enable fullscreen:", err);
        });
      }
    }
  };

  const renderForeignObjectNode = ({
    nodeDatum: person,
    toggleNode,
    foreignObjectProps,
  }: any) => {
    const wives = person.wives;
    const husband = person.husband;
    const noChildren = person.children?.length < 1;

    return (
      <g onClick={toggleNode}>
        {/* `foreignObject` requires width & height to be explicitly set. */}
        <foreignObject {...foreignObjectProps}>
          <div
            style={{ lineHeight: "90%" }}
            className={cn(
              "-p-2 rounded-md py-[1.5px] text-center text-xs",
              noChildren ? "" : "text-green-600"
            )}
          >
            {`${person.firstName}`}
            {wives && wives.length > 0
              ? ` + (${wives
                  .map((wife: any) => `${wife.firstName}`)
                  .join(", ")})`
              : null}

            {husband ? ` + ${husband.firstName}` : ""}
          </div>
        </foreignObject>
      </g>
    );
  };

  const userPlusButton = useRef<SVGGElement>(null);
  const handleCenterUser = () => {
    if (userPlusButton.current) {
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      userPlusButton.current.dispatchEvent(clickEvent);
    }
  };

  const nodeSize = { x: 200, y: 80 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -100,
    y: -20,
  };

  return (
    <div className="h-full w-full bg-blue-50" ref={containerRef}>
      <div className="absolute right-2 top-2 z-10 flex gap-4">
        <Tools
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
        />
      </div>

      <button onClick={handleCenterUser} className="absolute right-20 top-2">
        <Locate size={20} />
      </button>
      <Tree
        dimensions={dimentions}
        translate={translate}
        // pathClassFunc={customPathClass}
        data={data}
        scaleExtent={{ max: 2, min: 0.5 }}
        zoom={1.5}
        orientation="vertical"
        separation={{ siblings: 1.2, nonSiblings: 1.2 }}
        nodeSize={nodeSize}
        enableLegacyTransitions
        pathFunc={stepPathFunc}
        // renderCustomNodeElement={renderCustomNodeElement}
        renderCustomNodeElement={(rd3tProps: any) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
        }
      />
    </div>
  );
}
