import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useGetStatistics } from "@/hooks/query/statistics.query";

const COLORS = [
  "#FF5733", // red
  "#33FF57", // green
  "#3357FF", // blue
  "#FF33A1", // pink
  "#FF9633", // orange
  "#33FFF0", // cyan
  "#A133FF", // purple
];
const PROVINCE = [
  "कोशी प्रदेश",
  "मधेश प्रदेश",
  "बागमती प्रदेश",
  "गण्डकी प्रदेश",
  "लुम्बिनी प्रदेश",
  "कर्णाली प्रदेश",
  "सुदूरपश्चिम प्रदेश",
];

const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
// }: any) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="black"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };
export default function MyPieChart() {
  const { data, isLoading } = useGetStatistics(
    "/statistics/populationbyprovince"
  );

  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 900px) and (max-width : 1800px)"
  );
  return (
    <div className="bg-[url(/chart.svg)] bg-center bg-cover">
      <h1 className="p-4 text-2xl font-medium px-4">
        Our family in different Province
      </h1>
      <div className="grid lg:grid-cols-2">
        <div className="h-[400px] pb-2 flex justify-end">
          <ResponsiveContainer
            // height="100%"
            // width={isLargeDevice ? "50%" : "100%"}
            className={"w-full"}
          >
            <PieChart width={520} height={500}>
              <Pie
                data={data}
                labelLine={true}
                // label={renderCustomizedLabel}
                outerRadius={150}
                dataKey="value"
                label
              >
                {data?.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full p-4 lg:flex flex-col items-center justify-center">
          <div className="flex flex-row flex-wrap justify-start w-full space-y-3">
            {COLORS.map((c, idx) => (
              <div
                key={idx}
                className="w-1/2 flex items-center gap-2 justify-start"
              >
                <div className="h-10 w-10" style={{ backgroundColor: c }}></div>
                <div>{PROVINCE[idx]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
