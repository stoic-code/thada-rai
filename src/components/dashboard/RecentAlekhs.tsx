"use client";
import { useGetAlekhs } from "@/hooks/query/alekh.query";
import { useParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import AlekhCard from "./AlekhCard";
import { dateFormatter } from "@/lib/date";
import CommonHeading from "./CommonHeading";

const AlekhDashboard = () => {
  const { lang } = useParams();
  const { data, isLoading } = useGetAlekhs();

  if (isLoading) return null;

  console.log("aleekhhhh", data);

  return (
    <div className="mx-auto pb-10 md:pb-16">
      <CommonHeading
        title={lang === "np" ? "हालै थपिएका आलेखहरु" : "Recently Added Alekh"}
        link_title={lang === "np" ? "थप हेर्नुहोस" : "See All"}
        link_src="/alekh"
      />
      {/* 
      <div className="flex justify-between">
        <h1 className="pb-10 text-xl font-semibold text-black md:text-2xl">
          {lang === "np" ? "हालै थपिएका आलेखहरु" : "Recent Alekh"}
        </h1>
        <Link href="/alekh" className="pr-4 pt-4 text-right">
          <span className="text-primary">
            {lang === "np" ? "थप हेर्नुहोस" : "See All"}
          </span>
        </Link>
      </div> */}

      <div className="mx-auto pt-10 grid max-w-[95%] grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {data.map(
          (d: any, idx: number) =>
            idx < 3 && (
              <Link key={d._id.toString()} href={`/alekh/${d._id.toString()}`}>
                <AlekhCard
                  thumbnail={d.image.secure_url}
                  // author={d.createdBy.name}
                  author={d.author}
                  title={d.title}
                  createdAt={dateFormatter(d.createdAt)}
                  desc={d.body}
                />
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default AlekhDashboard;
