import "./public.css";
import GetApp from "@/components/home/GetApp";
import Overview from "@/components/dashboard/Overview";
import Features from "@/components/home/Features";
import History from "@/components/home/History";
import Link from "next/link";
import Statistics from "@/components/dashboard/Statistics";
import { cn } from "@/lib/utils";

const page = () => {
  return (
    <>
      <section className="h-[95vh] px-2 bg-yellow-700 bg-[url(/hero-bg.webp)] bg-cover md:bg-center bg-hero-mobile">
        <h2
          className={cn(
            "text-3xl text-left pt-3 md:pt-40 md:px-10 xl:text-6xl lg:text-4xl leading-relaxed lg:leading-snug xl:leading-snug text-white font-medium",
          )}
        >
          स्वागत छ <br /> ठाडाराई अधिकारी सेवा{" "}
          <span className="md:hidden">समाजमा</span>
          <span className="hidden md:block">समाजमा</span>
        </h2>
        <Link
          className="absolute bottom-6 border-2 py-2 px-10 rounded-md text-white hover:bg-white hover:text-black transition"
          href=""
        >
          Explore
        </Link>
      </section>

      {/* HISTORY */}
      <History />

      {/* BIRTH,DEATH, ANNYVERSARY */}
      <Statistics />

      {/* FEATURES */}
      <Features />

      {/* overview */}
      <Overview />

      <div className="bg-[#FFB70F]  py-6">
        <GetApp />
      </div>

      {/* 
        <section>
          <div className=" 2xl:container px-8 sm:px-10 lg:px-16 py-10 mt-[100px]">
            <div className="mb-8 flex flex-row justify-between items-center">
              <h1 className="text-xl lg:text-4xl font-bold text-center lg:text-left">
                Kulthan Mandir
              </h1>
              <div className="relative rounded-lg mb-4 shadow-lg">
                <input
                  className="w-full sm:w-[200px] lg:w-[300px] h-12 mt-4 border-2 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#FFFFFF] focus:border-white text-sm bg-white"
                  placeholder="Search your Bansaj"
                />
                <Search
                  className="absolute right-4 top-8 text-blue-800"
                  size={18}
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-10">
              <Image
                src="/home/mandir.svg"
                alt="Mandir"
                width={400}
                height={400}
              />
              <div className="flex flex-col items-start lg:items-start text-left mt-4 lg:text-left space-y-4">
                <h1 className="text-xl lg:text-3xl font-bold">
                  Kulthan Mandir Name
                </h1>
                <p className="flex items-center mt-2 text-sm lg:text-lg text-gray-700">
                  <MapPin className="mr-2 text-green-600" /> Kadaghari,
                  Kathmandu
                </p>
                <p className="mt-4 text-sm lg:text-sm leading-relaxed text-justify">
                  Lorem ipsum dolor sit amet consectetur. Massa ullamcorper amet
                  nunc cras nisl auctor et. Purus id ultrices nulla vulputate
                  dictumst dictumst mauris. Lorem ipsum dolor sit amet
                  consectetur. Massa ullamcorper amet nunc cras nisl auctor et.
                  Purus id ultrices nulla vulputate dictumst dictumst mauris.
                  Lorem ipsum dolor sit amet consectetur. Massa ullamcorper amet
                  nunc cras nisl auctor et. Purus id ultrices nulla vulputate
                  dictumst dictumst mauris. Lorem ipsum dolor sit amet
                  consectetur. Massa ullamcorper amet nunc cras nisl auctor et.
                  Purus id ultrices nulla vulputate dictumst dictumst mauris.
                  Lorem ipsum dolor sit amet consectetur. Massa ullamcorper amet
                  nunc cras nisl auctor et. Purus id ultrices nulla vulputate
                  dictumst dictumst mauris. Lorem ipsum dolor sit amet
                  consectetur. Massa ullamcorper amet nunc cras nisl auctor et.
                  Purus id ultrices nulla vulputate dictumst dictumst mauris.
                  Lorem ipsum dolor sit amet consectetur. Massa ullamcorper amet
                  nunc cras nisl auctor et. Purus id ultrices nulla vulputate
                  dictumst dictumst mauris.
                </p>
              </div>
            </div>
          </div>
        </section> */}
    </>
  );
};

export default page;
