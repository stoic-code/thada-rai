"use client";
import React from "react";
import SpouseEditForm from "./SpouseEditForm";

import PageLoadingUI from "@/components/PageLoadingUI";
import { notFound } from "next/navigation";
import { useGetSpouseData } from "@/hooks/query";

type TPageProps = {
  params: {
    id: string;
    lang: string;
  };
};

const page = ({ params }: TPageProps) => {
  const { id, lang } = params;
  const { data, isLoading, error } = useGetSpouseData(id);

  if (isLoading) return <PageLoadingUI />;
  if (error) return notFound();

  return (
    <div className="">
      <SpouseEditForm lang={lang} data={data} id={id} />
    </div>
  );
};

export default page;
