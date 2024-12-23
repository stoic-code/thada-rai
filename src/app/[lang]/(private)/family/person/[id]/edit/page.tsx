"use client";
import React from "react";
import EditForm from "./PersonForm.tsx";
import PageLoadingUI from "@/components/PageLoadingUI";
import { notFound, useSearchParams } from "next/navigation";
import {
  useGetPersonData,
  useGetPersonWives,
} from "@/hooks/query/family.query";

const page = ({ params }: { params: { lang: string; id: string } }) => {
  const searchParams = useSearchParams();
  const father = searchParams.get("father");
  const { id, lang } = params;
  const { data, isLoading, error } = useGetPersonData(id);

  if (father && father !== "null") {
    const {
      data: mothers,
      isLoading: mothersLoading,
      error: mothersError,
    } = useGetPersonWives(father);

    if (isLoading || mothersLoading) return <PageLoadingUI />;
    if (error || mothersError) return notFound();

    return (
      <div>
        <EditForm id={id} lang={lang} data={data} mothers={mothers} />
      </div>
    );
  }
  if (isLoading) return <PageLoadingUI />;
  return (
    <div>
      <EditForm id={id} lang={lang} data={data} mothers={[]} />
    </div>
  );
};

export default page;
