"use client";
import React from "react";
import YogdanHeader from "@/components/yogdan/YogdanHeader";

export default function layout({
  children,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <div className="mx-2 my-8 min-h-screen md:mx-auto md:w-[90%]">
      <div>
        <YogdanHeader />
      </div>
      {children}
    </div>
  );
}
