"use client";
import { useGetSingleAlekh } from "@/hooks/query/alekh.query";
import { Calendar, Pencil } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleAlekh(id);

  if (isLoading) {
    return (
      <>
        <h1 className="m-auto mt-4 text-center text-2xl">
          Loading Aalekh.....
        </h1>
      </>
    );
  }
  console.log("useGetSingleAlekh data:", data);
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-10">
      <h1 className="text-center text-3xl font-semibold">{data?.title}</h1>

      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex gap-2">
          <Calendar size={20} />
          {String(new Date(data?.createdAt).toDateString())}
        </div>
        <div className="flex items-center gap-4 justify-center">
          <img
            src="/avatar.jpg"
            className="h-50 w-50 rounded-full border"
            width={50}
            alt=""
          />
          <div>
            <Pencil size={20} />
            {data?.author}
          </div>
        </div>
      </div>

      {data?.image.secure_url && (
        <img
          className="h-[50vh] w-full object-cover rounded-3xl border"
          src={data?.image.secure_url}
          alt=""
        />
      )}
      <p>{data?.body}</p>
    </div>
  );
};

export default page;
