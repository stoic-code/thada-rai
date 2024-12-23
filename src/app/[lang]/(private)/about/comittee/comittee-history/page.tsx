"use client";
import Image from "next/image";
import React from "react";

const Name = [
  {
    name: "Rajesh Hamal ",
    role: "अध्यक्ष",
  },
  {
    name: "Rajesh Hamal ",
    role: "अध्यक्ष",
  },
  {
    name: "Rajesh Hamal ",
    role: "अध्यक्ष",
  },
  {
    name: "Rajesh Hamal ",
    role: "अध्यक्ष",
  },
  {
    name: "Rajesh Hamal",
    role: "अध्यक्ष",
  },
  {
    name: "Rajesh Hamal",
    role: "अध्यक्ष",
  },
  {
    name: "Rajesh Hamal",
    role: "अध्यक्ष",
  },
  {
    name: "Rajesh Hamal",
    role: "अध्यक्ष",
  },
];

export default function Page() {
  return (
    <div className="2xl:container  px-2 sm:px-6 lg:px-8 my-8 py-0">
      <div className="text-center lg:text-left">
        <div className="">
          <h1 className="lg:text-4xl text-2xl font-semibold">
            Committee History
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row mt-8  ">
          {/* OPTIONs TABS */}
          <div className="lg:mr-16 mb-8 ">
            <h1 className="text-3xl text-center font-semibold">Years</h1>
            <div className="flex flex-col items-center mt-8 space-y-4 gap-4 leading-relaxed tracking-wider">
              <div className="hover:border-blue-600 border-transparent border-b-2 cursor-pointer w-fit  text-xl">
                2005-2008
              </div>
              <div className="hover:border-blue-600 border-transparent border-b-2 cursor-pointer w-fit text-xl">
                2009-2012
              </div>
              <div className="hover:border-blue-600 border-transparent border-b-2 cursor-pointer w-fit text-xl">
                2013-2015
              </div>
              <div className="hover:border-blue-600 border-transparent border-b-2 cursor-pointer w-fit  text-xl">
                2016-2019
              </div>
              <div className="hover:border-blue-600 border-transparent border-b-2 cursor-pointer w-fit  text-xl">
                2020-2023
              </div>
              <div className="hover:border-blue-600 border-transparent border-b-2 cursor-pointer  w-fit text-xl">
                2024-20...
              </div>
            </div>
          </div>
          {/* HERO SECTION */}
          <div className=" bg-blue-50  w-full  xl:w-4/5 ">
            <div className="text-center border-2  border-black  rounded-lg p-2 sm:p-4 m-4 overflow-hidden ">
              <h1 className="text-2xl mb-8 font-semibold">Central Committee</h1>
              <div className="flex flex-col items-center mb-8">
                <h1 className="text-xl font-semibold">अध्यक्ष</h1>
                <Image
                  src="/dummy/boy.jpg"
                  alt="editor"
                  width={200}
                  height={200}
                />
                <h2 className="text-xl font-semibold mt-4">Rajesh Hamal</h2>
                <p className="mb-8">9876543210</p>
              </div>
              <div className=" h-auto ">
                {[...Array(4)].map((_, sectionIndex) => (
                  <div className="text-start mt-5 ml-5" key={sectionIndex}>
                    <h1 className="mb-4 text-xl">अध्यक्ष</h1>
                    <div className="flex flex-wrap">
                      {Name.map((item, index) => (
                        <div
                          key={index}
                          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 mb-4"
                        >
                          <h2 className="text-lg">{item.name}</h2>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
