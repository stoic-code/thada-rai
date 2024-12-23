"use client";

import PageLoadingUI from "@/components/PageLoadingUI";
import { useGetSingleAlekh } from "@/hooks/query/alekh.query";
import { dateFormatter } from "@/lib/date";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleAlekh(id);
  console.log("signle alekhe", data);
  const para = `<p>loreamdsoamdao loreamdsoamdao
     loreamdsoamdaoloreamdsoamdao
      loreamdsoamdao vv loreamdsoamdaoloreamdsoamdao 
      loreamdsoamdaoloreamdsoamdaoloreamdsoamdaoloreamdsoamdaolo
      reamdsoamdaoloreamdsoamdaoloreamdsoamdaoloreamdsoamdaoloream
      dsoamdaoloreamdsoamdaoloreamdsoamdaoloreamdsoamdaoloreamdsoamdaol
      oreamdsoamdaoloreamdsoamdaoloreamdsoamdaoloreamdsoamdaoloreamdsoamdao
      loreamdsoamdaoloreamdsoamdaoloreamdsoamdaoloreamdsoamdaoloreamdsoamdaolor
      eamdsoamdaoloreamdsoamdaoloreamdsoamdaoloreamdsoamdaoloreamds
      oamdaoloreamdsoamdaoloreamdsoamdaoloreamdsoamdaoloreamdsoamdao<p>`;
  if (isLoading) return <PageLoadingUI />;
  const { title, author, body, createdAt, image } = data;
  return (
    <div className=" 2xl:container  my-8 ">
      <div className="text-left p-4">
        <div className=" rounded-lg">
          <h1 className="text-3xl font-medium mb-2">{title}</h1>
          <div className="flex items-center gap-10 font-medium">
            <p className=" text-sm sm:text-base  ">{author}</p>
            <span className=" text-sm sm:text-base">
              {dateFormatter(createdAt)}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#FFFFFF] mx-2 sm:mx-4 p-4 rounded mt-4">
        <div
          className="flex flex-col  lg:flex-row text-center items-center lg:text-left  
         "
        >
          <img
            src={image.secure_url}
            alt="literature collection"
            width={400}
            height={400}
            className=" md:w-[380px]   h-[300px] object-cover  object-center w-full rounded-md"
          />
        </div>
        <div className="leading-relaxed text-justify  text-starts text-lg mt-8">
          <p dangerouslySetInnerHTML={{ __html: `${body}` }}></p>
        </div>
      </div>
    </div>
  );
}
