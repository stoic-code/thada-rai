"use client";
import React, { useRef } from "react";
import FamilyChart from "@/components/tree/diagram/Tree";
import PageLoadingUI from "@/components/PageLoadingUI";
import FilterForm from "@/components/tree/FilterForm";
import { useGetFullTree } from "@/hooks/query";
import NofullTree from "@/components/tree/NoFullTree";
import Tools from "@/components/tree/Tools";
import { useFullScreen } from "@/hooks";

const page = ({ params }: { params: { lang: string } }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGetFullTree();
  const { isFullscreen, toggleFullScreen } = useFullScreen(divRef);

  if (isLoading) return <PageLoadingUI />;
  // if (error) return notFound();
  return (
    <div ref={divRef} className="fixed h-screen w-screen bg-blue-50">
      <div className="absolute right-2 top-4 z-10 flex gap-2 md:gap-3">
        <Tools
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullScreen}
          textTreeRoute="/banshwali/text"
        />
      </div>
      <FilterForm lang={params.lang} />
      {data ? (
        <FamilyChart data={data} />
      ) : (
        <div className="flex h-screen w-full items-center justify-center">
          <NofullTree />
        </div>
      )}
    </div>
  );
};

export default page;
