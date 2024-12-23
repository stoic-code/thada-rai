"use client";
import React from "react";
import { notFound } from "next/navigation";
import PageLoadingUI from "@/components/PageLoadingUI";
import { useGetFullTree } from "@/hooks/query";
import { useSession } from "@/providers/SessionProvider";
import TextFamilyChart from "@/components/tree/textDiagram";

const page = () => {
  const {
    session: { user },
  } = useSession();
  const { data, isLoading } = useGetFullTree();
  if (isLoading) return <PageLoadingUI />;

  return (
    <div className="fixed h-screen w-screen bg-blue-50">
      {data ? <TextFamilyChart user={user} data={data} /> : notFound()}
    </div>
  );
};

export default page;
