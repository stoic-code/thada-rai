"use client";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Filter, Plus, Search } from "lucide-react";
import React, { useState } from "react";
// import CardWithImgCircle from "@/components/CardWithImgCircle";
// import { useQuery } from "react-query";
// import YogdanPopup from "./YogdanPopup";

// import { dictionary } from "./dictionary.ts";
// import { getRequest } from "@/lib/requests";
// import { useAuth } from "@/hooks/useAuth";

// import CardWithImgCircle from "@/components/yogdan/CardWithImgCircle";
// import YogdanPopup from "@/components/yogdan/YogdanPopup";
import { useGetYogdans } from "@/hooks/query/yogdan.query";
import PageLoadingUI from "@/components/PageLoadingUI";
import { dictionary } from "../dictionary";
import YogdanGrid from "./YogdanGrid";

const page = ({ params }: { params: { lang: string; id: string } }) => {
  const { lang, id } = params;
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
