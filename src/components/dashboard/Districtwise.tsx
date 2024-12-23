import { useGetStatistics } from "@/hooks/query/statistics.query";
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
//   { district: "District 1", population: 4000 },
//   { district: "District 2", population: 3000 },
//   { district: "District 3", population: 2000 },
//   { district: "District 4", population: 3000 },
//   { district: "District 5", population: 2500 },
//   { district: "District 6", population: 1500 },
//   { district: "District 7", population: 3000 },
//   { district: "District 8", population: 2000 },
//   { district: "District 9", population: 1000 },
//   { district: "District 10", population: 3500 },
//   { district: "District 12", population: 4000 },
// ];

export default function DistrictWise() {
  const { data, isLoading } = useGetStatistics(
    "/statistics/population-by-district"
  );

  if (isLoading) {
    return <></>;
  }

  return (
    <div>
      <div>
        <ResponsiveContainer width="100%" height={400}>
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
            <XAxis dataKey="district" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="population" fill="#13378b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
