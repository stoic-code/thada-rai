"use client";
import PageLoadingUI from "@/components/PageLoadingUI";
import DemoTree from "@/components/profile/DemoTree";
import { useConfirmMergeReq } from "@/hooks/mutations";
import { useGetMergeTree } from "@/hooks/query";
import { useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  const searchParams = useSearchParams();
  const here = searchParams.get("here");
  const tis = searchParams.get("this");
  const motherId = searchParams.get("motherId");

  const route = `/merge/mergedemo?mergethis=${tis}&mergehere=${here}${motherId ? `&motherId=${motherId}` : ""}`;
  const confirmRoute = `/merge/mergerequest?mergethis=${tis}&mergehere=${here}&${motherId ? `&motherId=${motherId}` : ""}`;

  const { data, isLoading } = useGetMergeTree(route);
  const { mutateAsync, isPending } = useConfirmMergeReq(confirmRoute);

  if (isLoading) return <PageLoadingUI />;
  return (
    <DemoTree
      data={data}
      demo
      actionLoading={isPending}
      confirmMerge={mutateAsync}
    />
  );
};

export default page;
