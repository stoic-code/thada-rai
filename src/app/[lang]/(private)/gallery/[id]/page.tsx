"use client";
import PageLoadingUI from "@/components/PageLoadingUI";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  useGetGalleries,
  useGetSingleGallery,
} from "@/hooks/query/gallery.query";
import { cn } from "@/lib/utils";
import { Images } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { scroll } from 'embla-carousel'; // Assuming correct import path

export default function page() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { data: recommendationGalleries } = useGetGalleries();
  // console.log("gallery", data);
  const { id } = useParams();
  // this is for the single gallery in carousel
  const { data: galleryList, isLoading } = useGetSingleGallery(id);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  // Handle dot click events
  const handleDotClick = (index: number) => {
    if (api) {
      // Ensure api is available before interacting with it
      //   api.goTo(index); // Directly go to the specified slide
      api.scrollTo(index);
    }
  };

  if (isLoading) return <PageLoadingUI />;

  return (
    <div className=" p-4 sm:p-10 2xl:container">
      {/* CAROUSEL */}
      <h2 className=" text-3xl font-semibold py-4">{galleryList.title}</h2>
      <div className=" overflow-hidden  flex gap-4  sm:flex-row flex-col ">
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
          }}
          className="w-full  max-w-6xl mx-auto "
        >
          <CarouselContent className=" ">
            {galleryList.images.map((img: any, index: number) => (
              <CarouselItem key={index} className=" rounded-md    lg:basis-1/1">
                <div className="p-1">
                  <Image
                    width={500}
                    height={500}
                    className=" w-full h-[40vh] sm:h-[60vh] md:h-[70vh] object-contain object-center rounded-md"
                    alt="bus"
                    src={img.secure_url}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-1 md:left-1" />
          <CarouselNext className=" absolute right-1" />
          <div className="  flex w-full justify-center gap-3 py-2 md:py-4">
            {galleryList.images.map((event: any, idx: number) => (
              <div
                onClick={() => handleDotClick(idx)}
                key={idx}
                style={{ transition: "width 0.2s ease" }}
                className={cn(
                  "h-2 w-4 rounded-full  cursor-pointer bg-neutral-300",
                  idx === current - 1 ? "w-10 h-2 bg-primary" : " "
                )}
              />
            ))}
          </div>
        </Carousel>
        {/* SMALL PICTURES */}
        <div>
          <div className=" custom-scrollbar pr-2 pb-2 sm:pb-0  overflow-auto sm:h-[60vh] gap-4 flex flex-row sm:flex-col">
            {galleryList.images.map((img: any, idx: number) => {
              return (
                <button
                  onClick={() => handleDotClick(idx)}
                  key={idx}
                  className=" cursor-pointer flex-shrink-0 space-y-2"
                >
                  <Image
                    src={img.secure_url}
                    alt="temple"
                    height={400}
                    width={400}
                    className=" w-40 h-20 object-cover  rounded-md"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {/* RECOMMENDATION GALLERY */}
      <div>
        <div className="  mt-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {recommendationGalleries?.slice(0, 3).map((g: any, idx: number) => {
            return (
              <Link
                href={`/gallery/${g._id}`}
                key={idx}
                className="  space-y-2 w-full "
              >
                <div className="flex w-full justify-between  whitespace-nowrap items-center gap-4">
                  <p className=" line-clamp-1">{g.title}</p>
                  <p className=" flex items-center gap-2">
                    <Images size={20} />
                    {g.images.length}
                  </p>
                </div>
                <div>
                  <img
                    src={g.images[0].secure_url}
                    alt="temple"
                    height={400}
                    width={400}
                    className=" h-[200px] w-full object-cover rounded-md"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
