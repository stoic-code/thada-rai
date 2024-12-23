"use client";
import { useGetStatistics } from "@/hooks/query/statistics.query";
import { Cake, Frown } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import PageLoadingUI from "../PageLoadingUI";

export default function Statistics() {
  const { data, isLoading } = useGetStatistics("/statistics/birth-death-stats");
  const { lang } = useParams();

  if (isLoading) return null;
  return (
    <div>
      <div className="px-2 py-10">
        <div className="space-y-3 md:py-10  2xl:container">
          <div className="bg-primary/80 text-white flex justify-between max-w-3xl py-4 px-4 rounded-3xl mx-auto">
            <div>
              <span className="text-sm">
                {" "}
                {lang === "np" ? "जम्मा जोडिएका वंश" : " Bansaj Created"}
              </span>{" "}
              : {data?.total_created}
            </div>
            <div>
              <span className="text-sm">
                {lang === "np" ? "आज जोडिएको वंश" : "Bansaj Created Today"}{" "}
              </span>{" "}
              : {data?.created_today}
            </div>
          </div>
          <div className="bg-primary/80 text-white flex justify-between max-w-4xl py-4 px-8 rounded-3xl mx-auto">
            <div>
              <div className="flex items-center gap-2 text-2xl">
                <Cake /> {data?.birthday_today}
              </div>
              <p className="text-xs sm:text-base">
                {lang === "np" ? "शुभ जन्मोत्सव" : "Birthday(s)"}{" "}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-2xl">
                <Cake /> {data?.anniversary_today}
              </div>
              <p className="text-xs sm:text-base">
                {lang === "np" ? "विवाह वार्षिकोत्सव" : " Anniversary(s)"}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-2xl">
                <Frown /> {data?.death_anniversary_today}
              </div>
              <p className="text-xs sm:text-base">
                {" "}
                {lang === "np" ? "परमधाम गमन" : "Death(s)"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
