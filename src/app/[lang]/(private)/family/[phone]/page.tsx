"use client";
import FamilyChart from "@/components/tree/diagram/Tree";
import Tools from "@/components/tree/Tools";
import PageLoadingUI from "@/components/PageLoadingUI";
import { notFound, useSearchParams } from "next/navigation";
import { useGetTreeById, useGetTreeByPhone } from "@/hooks/query/family.query";
import BackBtn from "@/components/BackBtn";
import { useFullScreen } from "@/hooks/useFullScreen";
import { useRef } from "react";

const page = ({ params }: { params: { phone: string } }) => {
  const searchParams = useSearchParams();
  const divRef = useRef<HTMLDivElement>(null);
  const { isFullscreen, toggleFullScreen } = useFullScreen(divRef);
  const { phone } = params;
  const fromId = searchParams.get("fromId");

  const { data, isLoading, error } = fromId
    ? useGetTreeById(phone)
    : useGetTreeByPhone(phone);

  if (isLoading) return <PageLoadingUI />;
  if (error) return notFound();

  return (
    <div ref={divRef} className="relative h-full bg-blue-50">
      <BackBtn className="absolute left-2 top-4 z-10" />
      <div className="absolute right-2 top-4 z-10 flex gap-4">
        <Tools
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullScreen}
        />
      </div>
      <div>
        <FamilyChart data={data} />
      </div>
    </div>
  );
};

export default page;
