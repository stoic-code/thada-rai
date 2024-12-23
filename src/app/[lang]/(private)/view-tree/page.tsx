"use client";
import React from "react";
import { notFound, useSearchParams } from "next/navigation";
import FamilyChart from "@/components/tree/diagram/Tree";
import PageLoadingUI from "@/components/PageLoadingUI";

import { Check, Loader, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useViewDemoTreeForProfile } from "@/hooks/query";
import { useChangeReqStatus } from "@/hooks/mutations";

const page = () => {
  const searchParams = useSearchParams();
  const reqId = searchParams.get("reqId");
  const mergethis = searchParams.get("mergethis");
  const mergehere = searchParams.get("mergehere");
  const claimthis = searchParams.get("claimthis");
  const type = searchParams.get("tab");

  const isReceivedMergeReq = type == "received-merge";

  const isReceivedClaimedReq = type === "received-claim";
  const isSentMergeReq = type === "sent-merge";
  const isSentClaimReq = type === "sent-claim";

  // FOR L0GIC
  const isClaimReq = isReceivedClaimedReq || isSentClaimReq;
  const isMergeReq = isReceivedMergeReq || isSentMergeReq;

  const route = `/merge/${isClaimReq ? "claimdemo" : "mergedemo"}?${isMergeReq ? `mergethis=${mergethis}&mergehere=${mergehere}` : `claimthis=${claimthis}`}`;

  const { data, isLoading, error } = useViewDemoTreeForProfile(route);
  const { mutateAsync, isPending } = useChangeReqStatus(reqId!);

  if (isLoading) return <PageLoadingUI />;
  if (error) return notFound();

  const handleConfirm = async () => {
    mutateAsync({
      type: isReceivedMergeReq ? "MERGE" : "CLAIM",
      status: "REJECTED",
    });
  };

  const handleReject = () => {
    mutateAsync({
      type: isReceivedMergeReq ? "MERGE" : "CLAIM",
      status: "VERIFIED",
    });
  };

  return (
    <div className="relative h-screen w-full">
      {(isReceivedClaimedReq || isReceivedMergeReq) && (
        <div className="absolute right-3 top-2 z-10 flex gap-2">
          {isPending ? (
            <Loader className="animate-spin text-neutral-500" />
          ) : (
            <>
              <Button
                disabled={isPending}
                variant="outline"
                className="border-red-500 hover:bg-destructive hover:text-white group"
                onClick={handleConfirm}
              >
                <X className="text-red-500 group-hover:text-white" />
                Cancel
              </Button>
              <Button
                disabled={isPending}
                onClick={handleReject}
                variant="outline"
                className="border-green-600 hover:bg-green-600 hover:text-white group"
              >
                <Check className="text-green-600 group-hover:text-white" />
                confirm
              </Button>
            </>
          )}
        </div>
      )}
      <FamilyChart data={data} />
    </div>
  );
};

export default page;
