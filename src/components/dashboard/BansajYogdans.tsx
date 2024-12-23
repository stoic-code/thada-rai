"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetYogdans } from "@/hooks/query/yogdan.query";
import { useParams } from "next/navigation";
import YogdanPopup from "../yogdan/YogdanPopup";
import CommonHeading from "./CommonHeading";

export function BansajYogdans() {
  const { lang } = useParams();
  const { data, isLoading } = useGetYogdans();
  if (isLoading) return null;

  console.log("BansajYogdans useGetYogdans: ", data);

  return (
    <div>
      <CommonHeading
        title={
          lang === "np" ? "हालै थपिएका बंशज योगदान" : "Recent Bansaj Yogdan"
        }
        link_title={lang === "np" ? "थप हेर्नुहोस" : "See All"}
        link_src="/yogdan"
      />
      <div className="bg-[url(/yogdan.svg)] py-10 mt-10">
        <Carousel
          opts={{
            align: "start",
          }}
          className="max-w-[90%] mx-auto"
        >
          <CarouselContent className="">
            {data?.map((d: any, idx: number) => (
              <CarouselItem key={d._id} className="md:basis-1/2 lg:basis-1/3">
                <YogdanPopup
                  key={idx}
                  name={d.name}
                  description={d.description}
                  image={d.image.secure_url}
                  type={d.type}
                  birthPlace={d.birthPlace}
                  status=""
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="py-2 h-[220px]">
                        <div className="flex gap-2 items-center">
                          <img
                            height={80}
                            width={80}
                            src={d.image.secure_url}
                            alt=""
                            className="rounded-full"
                          />
                          {d.name}
                        </div>
                        <p className="line-clamp-5 text-muted-foreground">
                          {d.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </YogdanPopup>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" absolute  -left-6  md:-left-10 " />
          <CarouselNext className=" absolute  -right-6 md:-right-10" />
        </Carousel>
      </div>
    </div>
  );
}
