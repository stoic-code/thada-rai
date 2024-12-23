"use client";
import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import construction from "@/components/animation/construction.json";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const GetApp = () => {
  return (
    <section id="get_the_app" className="my-6 relative overflow-hidden ">
      <div className="container">
        <Image
          className="absolute right-0 top-[-5rem] hidden xl:block"
          alt="svg"
          src={"/getApp/DotsGrid.svg"}
          width={150}
          height={150}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4">
          {/* WILL REMAIN HIDDEN TILL APP IS READY */}
          <div className=" hidden flex-col md:pt-10 gap-8 lg:gap-16 col-span-2 max-w-6xl">
            <h3 className="text-3xl md:text-4xl font-semibold">
              Download the app today to get early access
            </h3>
            <div className="flex flex-col items-center md:flex-row gap-4">
              <Image
                className=" hidden"
                src={"/getApp/QR.svg"}
                height={150}
                width={200}
                alt="qr"
              />
              <div>
                <p className="">
                  "Enhance your Digital Banshawali experience with our
                  convenient and feature-rich mobile app. Download it now to
                  unlock a world of seamless access, personalized content, and
                  exclusive offers, right at your fingertips. Stay connected,
                  stay updated, and make the most of your Digital Banshawali
                  journey – all through our user-friendly app. Get started today
                  and discover a new level of convenience!"
                </p>
                <div className="flex justify-center mt-8 md:justify-end">
                  <Image
                    src={"/getApp/StoreLogo.svg"}
                    width={300}
                    height={150}
                    alt="store logo"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" justify-center items-center lg:items-start flex flex-col  col-span-2 ">
            <div className=" flex flex-col items-center lg:items-start  gap-8">
              <h3 className="text-2xl  md:text-4xl font-semibold">
                App is under construction!!
              </h3>
              <p className="  lg:ml-16 font-medium">Download app on</p>
              <div className="flex justify-start ">
                <Image
                  src={"/getApp/StoreLogo.svg"}
                  width={300}
                  height={150}
                  alt="store logo"
                />
              </div>
            </div>
          </div>
          <div className="flex  mt-8 lg:mt-0 relative  col-span-2">
            <img
              className=" w-[200px] md:w-[400px] rounded-md "
              alt="svg"
              src={"/getApp/Midnight.png"}
              // height={1000}
              // width={1000}
            />
            <div className=" flex-shrink-0 absolute right-0">
              <Lottie
                animationData={construction}
                className=" max-w-[200px] max-h-[280px]  md:max-w-[400px]   md:max-h-[300px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetApp;
