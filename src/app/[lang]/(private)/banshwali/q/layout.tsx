import React, { ReactNode } from "react";
import FilterPills from "@/components/tree/FilterPills";
import dynamic from "next/dynamic";

const FilterForm = dynamic(() => import("@/components/tree/FilterForm"), {
  ssr: false,
});

const layout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) => {
  return (
    <div className="relative">
      <FilterForm lang={params.lang} />
      <div className="md:pl-[350px]">
        <FilterPills />
        {children}
      </div>
    </div>
  );
};

export default layout;
