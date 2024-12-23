"use client";
import Image from "next/image";
import React from "react";
import CommonHeading from "./CommonHeading";
import { useGetGalleries } from "@/hooks/query/gallery.query";
import PageLoadingUI from "../PageLoadingUI";
import Link from "next/link";
import { Images } from "lucide-react";
import { useParams } from "next/navigation";

export default function OurGallery() {
  const { lang } = useParams();
  const { data, isLoading } = useGetGalleries();
  // console.log("gallery", data);

  if (isLoading) return <PageLoadingUI />;
  // console.log("checking_data: ", data);

  return (
    <div>
      <div className="space-y-8 py-10">
        <CommonHeading
          title={lang === "np" ? "हाम्रो ग्यालरी" : "Our Gallery"}
          link_title={lang === "np" ? "थप हेर्नुहोस" : "See All"}
          link_src="/gallery"
        />

        <div className=" space-y-4">
          {/* FIRST GRID */}
          <div className=" grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href={`/gallery/${data[0]?._id}`}
              className="relative cursor-pointer order-1 md:order-2  w-full  col-span-1 h-[20vh] md:h-[40vh]  rounded-md"
            >
              {data[0] && (
                <Image
                  src={data[0]?.images[0].secure_url}
                  alt="temple"
                  height={400}
                  width={400}
                  className=" w-full  h-full rounded-md object-cover"
                />
              )}
              <div className="rounded-md absolute inset-0 cursor-pointer bg-none transition-all duration-500 group hover:bg-black/80">
                <div className="transition-all sm:text-base text-xs space-y-2 cursor-pointer duration-500  absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] group-hover:text-white font-medium tracking-widest  text-transparent">
                  {data[0]?.title}
                  <span className=" flex gap-2 items-center  justify-center">
                    <Images size={16} /> {data[0]?.images.length}
                  </span>
                </div>
              </div>
            </Link>
            <Link
              href={`/gallery/${data[1]?._id}`}
              className=" relative cursor-pointer h-[20vh] md:h-[40vh] col-span-1 order-1 rounded-md"
            >
              {data[1] && (
                <Image
                  src={data[1]?.images[0].secure_url}
                  alt="temple"
                  height={400}
                  width={400}
                  className=" w-full  h-full rounded-md object-cover"
                />
              )}{" "}
              <div className="rounded-md absolute inset-0 cursor-pointer bg-none transition-all duration-500  group hover:bg-black/80">
                <div className="transition-all  sm:text-base text-xs space-y-2 cursor-pointer duration-500  absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] group-hover:text-white font-medium tracking-widest  text-transparent">
                  {data[1]?.title}
                  <span className=" flex gap-2 items-center  justify-center">
                    <Images size={16} /> {data[1]?.images.length}
                  </span>
                </div>
              </div>
            </Link>
            <Link
              href={`/gallery/${data[2]?._id}`}
              className="relative h-[20vh] md:h-[40vh] col-span-1 order-3"
            >
              {data[2] && (
                <Image
                  src={data[2]?.images[0].secure_url}
                  alt="temple"
                  height={400}
                  width={400}
                  className=" w-full h-full  rounded-md object-cover"
                />
              )}{" "}
              <div className="rounded-md absolute inset-0 cursor-pointer bg-none transition-all duration-500 group  hover:bg-black/80">
                <div className="transition-all  sm:text-base text-xs space-y-2 cursor-pointer duration-500  absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] group-hover:text-white font-medium tracking-widest  text-transparent">
                  {data[2]?.title}
                  <span className=" flex gap-2 items-center  justify-center">
                    <Images size={16} /> {data[2]?.images.length}
                  </span>
                </div>
              </div>
            </Link>
            <Link
              href={`/gallery/${data[3]?._id}`}
              className="relative order-3 md:order-3   col-span-1 h-[20vh] md:h-[40vh] "
            >
              {data[3] && (
                <Image
                  src={data[3]?.images[0].secure_url}
                  alt="temple"
                  height={400}
                  width={400}
                  className=" w-full h-full   rounded-md object-cover"
                />
              )}{" "}
              <div className="rounded-md absolute inset-0 cursor-pointer group bg-none transition-all duration-500  hover:bg-black/80">
                <div className="transition-all  sm:text-base text-xs text-center space-y-2 cursor-pointer duration-500  absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] group-hover:text-white font-medium tracking-widest  text-transparent">
                  {data[3]?.title}
                  <span className=" flex gap-2 items-center  justify-center">
                    <Images size={16} /> {data[3]?.images.length}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
