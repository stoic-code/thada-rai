"use client";
import PageLoadingUI from "@/components/PageLoadingUI";
import DemoTree from "@/components/profile/DemoTree";
import { useGetFamilyTree } from "@/hooks/query";
import { useRouter, useSearchParams } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { data, isLoading } = useGetFamilyTree();
  const searchParams = useSearchParams();

  const here = searchParams.get("here");
  const motherId = searchParams.get("motherId");

  const goToDemoPage = (id: string) => {
    router.push(
      `/family/merge/confirm?here=${here}&motherId=${motherId ? motherId : ""}&this=${id}`,
    );
  };

  if (isLoading) return <PageLoadingUI />;
  return <DemoTree data={data} requestDemo={goToDemoPage} />;
};

export default page;
