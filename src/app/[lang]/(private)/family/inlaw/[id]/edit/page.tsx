"use client";
import InLawEditForm from "./InLawEditForm";
import PageLoadingUI from "@/components/PageLoadingUI";
import { notFound } from "next/navigation";
import { useGetInlawData } from "@/hooks/query";
type TPageProps = {
  params: {
    id: string;
    lang: string;
  };
};

export default function page({ params }: TPageProps) {
  const { data, isLoading, error } = useGetInlawData(params.id);
  if (isLoading) return <PageLoadingUI />;
  if (error) return notFound();

  return <InLawEditForm lang={params.lang} data={data} id={params.id} />;
}
