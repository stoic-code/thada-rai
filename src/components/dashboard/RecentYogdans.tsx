"use client";
import Image from "next/image";
import React from "react";
import CommonHeading from "./CommonHeading";
import { useGetYogdans } from "@/hooks/query/yogdan.query";
import Link from "next/link";
import YogdanPopup from "../yogdan/YogdanPopup";
import CardWithImgCircle from "../yogdan/CardWithImgCircle";

export default function RecentYogdans() {
  const { data, isLoading } = useGetYogdans();

  console.log("yogdanss", data);
  return (
    <div>
      <div className="   space-y-4">
        <CommonHeading
          title="Recent Yogdan"
          link_title="View All"
          link_src="/yogdan"
        />
        {/* LIST OF THE YOGDNIS */}
        <div className=" grid  grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3  pt-10">
          {/* <div className=" space-y-4"> */}
          {data?.slice(0, 3).map((yog: any, idx: number) => {
            return (
              <div key={idx} className=" w-full ">
                <YogdanPopup
                  key={idx}
                  name={yog.name}
                  description={yog.description}
                  image={yog.image.secure_url}
                  type={yog.type}
                  birthPlace={yog.birthPlace}
                  status={yog.status}
                >
                  <CardWithImgCircle
                    image={yog.image.secure_url}
                    desc={yog.description}
                    name={yog.name}
                  />
                </YogdanPopup>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
