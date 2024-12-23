import { useGetStatistics } from "@/hooks/query/statistics.query";
import { useParams } from "next/navigation";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

// const data = [
//   { age: "0-10", male: 60000, female: 63123 },
//   { age: "10-20", male: 120000, female: 114234 },
//   { age: "20-30", male: 170000, female: 175345 },
//   { age: "30-40", male: 230000, female: 226456 },
//   { age: "40-50", male: 270000, female: 297567 },
//   { age: "50-60", male: 320000, female: 358678 },
//   { age: "60-70", male: 370000, female: 419789 },
//   { age: "70-80", male: 410000, female: 480890 },
//   { age: "80-90", male: 450000, female: 451901 },
// ];

export default function BarDiagram() {
  const { data, isLoading } = useGetStatistics(
    "/statistics/populationbyagegroup"
  );

  if (isLoading) {
    return <></>;
  }

  const { lang } = useParams();
  return (
    <div>
      <div>
        <ResponsiveContainer width="100%" height={400}>
          {data?.length > 0 ? (
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="male" fill="#13378b" />
              <Bar dataKey="female" fill="#ffb60d" />
            </BarChart>
          ) : (
            <h1 className="w-fit m-auto text-2xl">
              {lang === "en" ? "Not Enought data !! " : "पर्याप्त डाटा छैन !!"}
            </h1>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
