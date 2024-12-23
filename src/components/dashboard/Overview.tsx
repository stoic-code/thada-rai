"use client";
import React, { useState } from "react";
import BarDiagram from "./overview/BarDiagram";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
const MyPieChart = dynamic(() => import("./MyPieChart"), { ssr: false });
import DistrictWise from "./Districtwise";

enum tabEnum {
  BarDiagram = "bardiagram",
  Population = "population",
  Piechart = "piechart",
}

export default function Overview() {
  const [tab, setTab] = useState<tabEnum>(tabEnum.Piechart);
  return (
    <div
      style={{
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.1",
      }}
      className="bg-white border rounded-xl overflow-hidden"
    >
      <div className="space-y-8 2xl:container">
        <div className=" flex justify-between items-center text-black text-2xl font-semibold">
          <h1 className="text-3xl lg:text-4xl font-semibold px-4 pt-10">
            Overview
          </h1>
        </div>
        {/* TABS */}
        <div className="flex items-center gap-4 px-4">
          <button
            onClick={() => setTab(tabEnum.Piechart)}
            className={cn(
              " font-medium transition-all delay-100 duration-300  px-2 py-1 rounded-full",
              tab === tabEnum.Piechart && "bg-yellow-500"
            )}
          >
            Piechart
          </button>
          <button
            onClick={() => setTab(tabEnum.Population)}
            className={cn(
              " font-medium transition-all  delay-100 duration-300 px-2 py-1 rounded-full",
              tab === tabEnum.Population && "bg-yellow-500"
            )}
          >
            Population
          </button>
          <button
            onClick={() => setTab(tabEnum.BarDiagram)}
            className={cn(
              " font-medium transition-all delay-100 duration-300  px-2 py-1 rounded-full",
              tab === tabEnum.BarDiagram && "bg-yellow-500"
            )}
          >
            Age
          </button>
        </div>
        <div>
          {tab === tabEnum.Population ? (
            <DistrictWise />
          ) : tab === tabEnum.BarDiagram ? (
            <BarDiagram />
          ) : tab === tabEnum.Piechart ? (
            <MyPieChart />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
