"use client";
import React, { useState } from "react";
import { useGetYogdans } from "@/hooks/query/yogdan.query";
import PageLoadingUI from "@/components/PageLoadingUI";
import YogdanGrid from "../YogdanGrid";
import { dictionary } from "../../dictionary";

const page = ({ params }: { params: { lang: string } }) => {
  const { lang } = params;
  const { data, isLoading } = useGetYogdans();

  console.log("yogdanss", data);
  //   const { token } = useAuth();
  const dict = dictionary[lang as keyof typeof dictionary];
  const [query, setParams] = useState({
    name: "",
    type: "",
  });

  if (isLoading) return <PageLoadingUI />;

  return <YogdanGrid data={data} />;
};

export default page;
