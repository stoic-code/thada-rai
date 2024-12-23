"use client";
import React from "react";
import { notFound, useSearchParams } from "next/navigation";
import DemoTree from "@/components/profile/DemoTree";
import PageLoadingUI from "@/components/PageLoadingUI";
import { useGetClaimedDemo } from "@/hooks/query";
import { useConfirmClaim } from "@/hooks/mutations";

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("here");
  const { data, isLoading, error } = useGetClaimedDemo(id!);

  const { mutateAsync, isPending } = useConfirmClaim();

  if (isLoading) return <PageLoadingUI />;
  if (error) return notFound();

  return (
    <DemoTree
      demo
      actionLoading={isPending}
      confirmMerge={() => mutateAsync(id!)}
      data={data}
    />
  );
};

export default page;
