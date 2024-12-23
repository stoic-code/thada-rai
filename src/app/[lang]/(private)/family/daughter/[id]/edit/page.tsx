"use client";
import React from "react";
import DaughterEditForm from "./DaughterEditForm";
import PageLoadingUI from "@/components/PageLoadingUI";
import { notFound, useSearchParams } from "next/navigation";
import { useGetDaughterData, useGetPersonWives } from "@/hooks/query";
import { removeEmptyFields } from "@hyper/web-common";

type TPageProps = {
  params: {
    id: string;
    lang: string;
  };
};

const page = ({ params }: TPageProps) => {
  const { id, lang } = params;
  const searchParams = useSearchParams();
  const father = searchParams.get("father");

  const { isLoading, data, error } = useGetDaughterData(id);
  // console.log(data);

  const {
    isLoading: mothersLoading,
    data: mothers,
    error: mothersError,
  } = useGetPersonWives(father!);

  if (isLoading || mothersLoading) return <PageLoadingUI />;
  if (error || mothersError) return notFound();
  return (
    <DaughterEditForm
      lang={lang}
      data={removeEmptyFields(data)}
      id={id}
      mothers={mothers}
    />
  );
};

export default page;
