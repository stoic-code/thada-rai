import { Users } from "lucide-react";
import React from "react";

export default function DistrictAdhikari() {
  return (
    <div className=" space-y-4">
      {/* HEADING */}
      <div className=" flex justify-between items-center text-black text-sm  sm:text-2xl font-semibold">
        <h2>Top 10 most populated District of Adhikari</h2>
        <p className=" whitespace-nowrap">View All</p>
      </div>

      {/* OVERVIEW grid */}
      <div className="  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
        {Array.from({ length: 10 }).map((_, idx) => {
          return (
            <div
              key={idx}
              className=" bg-primary p-4 rounded-md text-sm sm:text-2xl font-semibold text-white space-y-4"
            >
              <div className=" flex gap-2 self-start">
                <Users size={30} className="   text-yellow-500 flex-shrink-0" />
                <h3>152</h3>
              </div>
              <p>District 1</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
