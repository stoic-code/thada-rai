import { useParams, useRouter } from "next/navigation";
import { useCenteredTree } from "@/lib/tree";

import React from "react";
import Tree from "react-d3-tree";
import Node from "@/components/tree/family/merge/Node";
import { Check, Loader, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dictionary } from "@/dictionary";

const DemoTree = ({
  data,
  demo,
  requestDemo,
  actionLoading,
  confirmMerge,
}: {
  data: any;
  demo?: boolean;
  requestDemo?: any;
  actionLoading?: boolean;
  confirmMerge?: any;
}) => {
  const { lang } = useParams();
  const router = useRouter();
  const dict = dictionary[lang as keyof typeof dictionary];
  const { translate, containerRef, dimention } = useCenteredTree();
  const nodeSize = { x: 180, y: 100 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -50,
    y: -20,
  };

  const customPathClass = (linkDatum: any) => {
    const { source, target } = linkDatum;
    // Dashed link when merging
    if (target.data.mergethis) return "dashed-link normal-link";
    return "normal-link";
  };
  return (
    <div ref={containerRef} className="relative h-screen w-full">
      <Tree
        renderCustomNodeElement={({ nodeDatum }: { nodeDatum: any }) => {
          return (
            <g>
              {/* `foreignObject` requires width & height to be explicitly set. */}
              <foreignObject {...foreignObjectProps}>
                {nodeDatum.id ? (
                  <Node
                    demo={demo}
                    reqFunc={() => requestDemo(nodeDatum.id)}
                    person={nodeDatum}
                  />
                ) : (
                  <></>
                )}
              </foreignObject>
            </g>
          );
        }}
        nodeSize={nodeSize}
        pathFunc="step"
        orientation="vertical"
        separation={{ siblings: 1, nonSiblings: 1 }}
        pathClassFunc={customPathClass}
        scaleExtent={{ max: 10, min: 0.3 }}
        enableLegacyTransitions
        translate={translate}
        data={data}
        dimensions={dimention}
      />

      {demo && (
        <>
          <div className="absolute right-3 top-2 flex gap-2">
            {actionLoading ? (
              <Loader className="animate-spin text-neutral-500" />
            ) : (
              <>
                <Button
                  disabled={actionLoading}
                  variant="outline"
                  className="border-red-500 hover:bg-destructive hover:text-white group"
                  onClick={() => router.push("/family")}
                >
                  <X
                    className="text-red-500 group-hover:text-white transition"
                    size={20}
                  />
                  {dict.cancel}
                </Button>
                <Button
                  disabled={actionLoading}
                  onClick={confirmMerge}
                  variant="outline"
                  className="border-green-600 hover:bg-green-600 hover:text-white group"
                >
                  <Check className="text-green-600 group-hover:text-white transition" />
                  {dict.confirm}
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DemoTree;
