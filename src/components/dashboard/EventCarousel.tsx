"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import PageLoadingUI from "../PageLoadingUI";
import { useGetEvents } from "@/hooks/query/events.query";
import { dictionary } from "@/dictionary";
import { Calendar, Clock, MapPin } from "lucide-react";
import { nepaliDateFormatter } from "@/lib/date";
import Statistics from "./Statistics";

const Carousal = () => {
  const { lang } = useParams();
  const dict = dictionary[lang as keyof typeof dictionary];
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const { data, isLoading, error } = useGetEvents();
  if (isLoading) return <PageLoadingUI />;
  if (error) return notFound();
  return (
    <div
      style={{
        background: "url(/dashboard/blob.svg) no-repeat 100% 6%/51%",
      }}
      className=""
    >
      <div className="bg-[#f3f4f6] lg:bg-transparent">
        <div className="2xl:container max-w-[95%] mx-auto">
          <Carousel
            setApi={setApi}
            plugins={[
              //@ts-ignore
              Autoplay({
                delay: 5000,
              }),
            ]}
            opts={{ loop: true }}
            className="relative mx-auto h-fit w-full"
          >
            <CarouselContent className="">
              {data?.map((e: any, idx: number) => (
                <CarouselItem key={idx}>
                  <Link href={`/contributions/${e._id}`}>
                    <div className="mx-2 mt-8 grid grid-cols-1 rounded-xl bg-white border p-8 md:mx-8 md:grid-cols-2">
                      <div className="order-2 mt-4">
                        <h1 className="line-clamp-2 py-1 text-2xl font-semibold md:text-4xl">
                          {e.title}
                        </h1>
                        <div className="flex flex-col gap-4 md:gap-4 xl:gap-14">
                          {e.organizer && (
                            <p className="pt-3">
                              {dict.organized_by}:{" "}
                              <span className="text-black">{e.organizer}</span>
                            </p>
                          )}

                          <p className="line-clamp-6 w-[95%] text-left text-sm xl:text-lg">
                            {e.description}
                          </p>

                          <ul className="flex flex-col gap-2 text-sm">
                            <li className="flex gap-2">
                              <Calendar />
                              {nepaliDateFormatter(e.event_date)}
                            </li>

                            <li className="flex gap-2">
                              <Clock />
                              {e.event_time}
                            </li>

                            <li className="flex gap-2">
                              <MapPin />
                              {e.event_location}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="md:order-2">
                        <img
                          src={e.image.secure_url}
                          alt={"Event image"}
                          className="h-[200px] border-2 border-[#FFB70F] w-full rounded-xl object-cover md:h-[400px]"
                        />
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-1 md:left-1" />
            <CarouselNext className="absolute right-2 md:right-1 lg:text-white lg:hover:text-white" />
            <div className="absolute flex w-full justify-center gap-3 py-2 md:py-4">
              {data?.map((_: any, idx: number) => (
                <div
                  key={idx}
                  style={{ transition: "width 0.2s ease" }}
                  className={cn(
                    "h-3 w-3 rounded-full border-2 border-accent bg-white",
                    idx === current - 1 ? "w-8 bg-primary" : ""
                  )}
                />
              ))}
            </div>
          </Carousel>
        </div>
      </div>

      <Statistics />
    </div>
  );
};

export default Carousal;
