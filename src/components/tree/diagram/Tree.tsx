// import { IS_SAFARI } from "./safari";

"use client";
import Tree from "react-d3-tree";
import Node from "./Node";
import "./family.css";

import EmptyNode from "./EmptyNode";
import { useRef, useState } from "react";
import { Locate } from "lucide-react";
import { useCenteredTree } from "@/lib/tree";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "@/providers/SessionProvider";
import Tools from "../Tools";
import { useFullScreen } from "@/hooks";
// import { treeDummyData } from "@/data/tree-dummy-data";
// import { level_eight } from "@/data/testing-level/eight";
export default function FamilyChart({ data }: { data: any }) {
  const {
    session: { user },
  } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const readOnly = searchParams.get("readOnly") || pathname === "/banshwali";
  const isFullTreePage = pathname === "/banshwali";

  let nodeCount = 0;

  // Centered Tree
  const userPlusButton = useRef<SVGGElement>(null);

  const divRef = useRef<HTMLDivElement>(null);
  const { isFullscreen, toggleFullScreen } = useFullScreen(divRef);

  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
  }: any) => {
    // console.log(nodeDatum);
    const isUser = nodeDatum.id === user?.mynode;
    // console.log(nodeCount);
    nodeCount++;

    // console.log("node datum: ", nodeDatum);

    return (
      <g>
        {/* `foreignObject` requires width & height to be explicitly set. */}
        <foreignObject {...foreignObjectProps}>
          <Node
            user={user}
            isUser={isUser}
            person={nodeDatum}
            // depth={findDepthById(data, 106, 0)}
            depth={2}
          />
        </foreignObject>
        <g ref={isUser ? userPlusButton : null} onClick={toggleNode}>
          {nodeDatum.children && nodeDatum.children.length > 0 && (
            <circle strokeWidth={1} cx={0} cy={10} r={10} fill="#fff" />
          )}
          {nodeDatum.children && nodeDatum.children.length > 0 && (
            <>
              {nodeDatum.__rd3t.collapsed ? (
                <text
                  y={11}
                  strokeWidth={1}
                  fontSize="16"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="black"
                >
                  +
                </text>
              ) : (
                <text
                  y={11}
                  strokeWidth={1}
                  fontSize="16"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="black"
                >
                  -
                </text>
              )}
            </>
          )}
        </g>
      </g>
    );
  };

  const nodeSize = { x: 170, y: 110 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -50,
    y: -28,
  };

  const stepPathFunc = (linkDatum: any, orientation: any) => {
    const { source, target } = linkDatum;
    const deltaY = target.y - source.y;
    return orientation === "horizontal"
      ? `M${source.y},${source.x} H${source.y + deltaY / 2} V${target.x} H${
          target.y
        }`
      : `M${source.x},${source.y} V${source.y + deltaY / 2} H${target.x} V${
          target.y
        }`;
  };

  const customPathClass = (linkDatum: any) => {
    const { source, target } = linkDatum;
    const isOwner =
      source.data.ownerId === user?.id && target.data.ownerId === user?.id;

    // DASHED LINK WHEN MERGING
    if (target.data.mergethis) {
      return "dashed-link normal-link";
    }

    if (isOwner) {
      if (target.data.gender === "FEMALE") return "own_cluster is_girl";
      return "own_cluster";
    }

    return "link__to-leaf";
  };

  // CENTER USER WHEN USER IS AWAY
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

  const { dimention, containerRef, translate } = useCenteredTree();

  // function toggleFullScreen(): void {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <div>
      <div
        id="treeWrapper"
        ref={containerRef}
        style={{ width: "100%", height: "100%" }}
        className="fixed"
      >
        {(!readOnly || isFullTreePage) && (
          <div
            onClick={handleCenterUser}
            className="absolute cursor-pointer right-20 top-4"
          >
            <Locate size={20} />
          </div>
        )}
        <div className="absolute right-2 top-4 z-10 flex gap-2 md:gap-3">
          <Tools
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullScreen}
          />
        </div>

        {data && data.id ? (
          <Tree
            // initialDepth={2}
            dimensions={dimention}
            collapsible={true}
            separation={{ siblings: 0.9, nonSiblings: 1 }}
            data={data}
            scaleExtent={{ max: 10, min: 0.3 }}
            pathFunc={stepPathFunc}
            pathClassFunc={customPathClass}
            nodeSize={nodeSize}
            translate={translate}
            orientation="vertical"
            // enableLegacyTransitions
            renderCustomNodeElement={(rd3tProps: any) =>
              renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
            }
          />
        ) : (
          <div className="flex h-screen items-center justify-center">
            {readOnly ? null : <EmptyNode />}
          </div>
        )}
      </div>
    </div>
  );
}
