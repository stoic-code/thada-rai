"use client";
import { useRef } from "react";
import SearchForm from "@/components/tree/SearchForm";
import { Loader2 } from "lucide-react";
import Tools from "@/components/tree/Tools";
import { useGetFamilyTree } from "@/hooks/query/family.query";
import FamilyChart from "@/components/tree/diagram/Tree";
import { useFullScreen } from "@/hooks/useFullScreen";
import EmptyNode from "@/components/tree/diagram/EmptyNode";

const page = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const { isFullscreen, toggleFullScreen } = useFullScreen(divRef);
  const { data, isLoading, error } = useGetFamilyTree();

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        {/* 
        <Loader2 className="animate-spin" /> */}
        Loading...
      </div>
    );

  // console.log(data);
  // return <FamilyChart data={data} />;

  return (
    <div className="mt-2 h-screen w-screen overflow-hidden">
      <SearchForm />
      <div ref={divRef} className="relative h-full bg-blue-50">
        {/* <div className="absolute right-2 top-4 z-10 flex gap-2 md:gap-3">
          <Tools
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullScreen}
          />
        </div> */}
        {error ? <EmptyNode /> : <FamilyChart key={data} data={data} />}
      </div>
    </div>
  );
};

export default page;
