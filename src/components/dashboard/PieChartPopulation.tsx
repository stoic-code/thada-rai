// import "./styles.css";
import { useGetStatistics } from "@/hooks/query/statistics.query";
import { useMediaQuery } from "@uidotdev/usehooks";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Legend } from "recharts";

const data = [
  { province: "कोशी प्रदेश", population: 14 },
  { province: "बागमती प्रदेश", population: 2 },
  { province: "मधेश प्रदेश", population: 5 },
  { province: "कोशी प्रदेश", population: 14 },
  { province: "बागमती प्रदेश", population: 2 },
  { province: "मधेश प्रदेश", population: 5 },
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.province}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        className=" text-xs"
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        className=" text-xs"
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function PieChartPopulation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 900px) and (max-width : 1800px)"
  );
  const onPieEnter = useCallback(
    (_: any, index: any) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div className="h-[500px] relative">
      <ResponsiveContainer height="100%" width="100%">
        <PieChart height={800} width={800}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            innerRadius={isLargeDevice ? 120 : 20}
            outerRadius={isLargeDevice ? 160 : 40}
            fill="#8884d8"
            dataKey="population"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
