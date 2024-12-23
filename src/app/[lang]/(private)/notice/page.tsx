"use client";
import React from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { districts } from "./data";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useGetPopups } from "@/hooks/query/popup.query";
import PageLoadingUI from "@/components/PageLoadingUI";
import { dateFormatter } from "@/lib/date";

export default function Page() {
  const [district, setDistrictValue] = useLocalStorage("SelectedDistrict", "");
  const { data, isLoading } = useGetPopups();

  console.log("popupsss", data);
  const Impnotices = [
    {
      title: "केन्द्रिय कार्य समिती वैठक, साधारणसभा सूचना",
      date: "2024-05-10",
    },
    {
      title: "केन्द्रिय कार्य समिती वैठक, साधारणसभा सूचना",
      date: "2024-05-10",
    },
    {
      title: "केन्द्रिय कार्य समिती वैठक, साधारणसभा सूचना",
      date: "2024-05-10",
    },
    {
      title: "केन्द्रिय कार्य समिती वैठक, साधारणसभा सूचना ",
      date: "2024-05-10",
    },
    { title: "Notice 5", date: "2024-05-10" },
    { title: "Notice 6", date: "2024-05-10" },
    { title: "Notice 7", date: "2024-05-10" },
    { title: "Notice 8", date: "2024-05-10" },
  ];

  const notices = [
    {
      title: " जिल्ला अस्पतालमा सुधारको अवस्था",
      decription:
        "जिल्ला अस्पतालमा आधुनिक औषधालयको निर्माण भइरहेको छ। यसका लागि सरकारले विशेष ध्यान दिएको छ। जिल्ला अस्पतालमा आधुनिक औषधालयको निर्माण भइरहेको छ। यसका लागि सरकारले विशेष ध्यान दिएको छ।",
    },
    {
      title: " जिल्ला अस्पतालमा सुधारको अवस्था",
      decription:
        "जिल्ला अस्पतालमा आधुनिक औषधालयको निर्माण भइरहेको छ। यसका लागि सरकारले विशेष ध्यान दिएको छ। जिल्ला अस्पतालमा आधुनिक औषधालयको निर्माण भइरहेको छ। यसका लागि सरकारले विशेष ध्यान दिएको छ।",
    },
    {
      title: " जिल्ला अस्पतालमा सुधारको अवस्था",
      decription:
        "जिल्ला अस्पतालमा आधुनिक औषधालयको निर्माण भइरहेको छ। यसका लागि सरकारले विशेष ध्यान दिएको छ। जिल्ला अस्पतालमा आधुनिक औषधालयको निर्माण भइरहेको छ। यसका लागि सरकारले विशेष ध्यान दिएको छ।",
    },
    {
      title: " जिल्ला अस्पतालमा सुधारको अवस्था",
      decription:
        "जिल्ला अस्पतालमा आधुनिक औषधालयको निर्माण भइरहेको छ। यसका लागि सरकारले विशेष ध्यान दिएको छ। जिल्ला अस्पतालमा आधुनिक औषधालयको निर्माण भइरहेको छ। यसका लागि सरकारले विशेष ध्यान दिएको छ।",
    },
    {
      title: " जिल्ला अस्पतालमा सुधारको अवस्था",
      decription:
        "जिल्ला अस्पतालमा आधुनिक औषधालयको निर्माण भइरहेको छ। यसका लागि सरकारले विशेष ध्यान दिएको छ। जिल्ला अस्पतालमा आधुनिक औषधालयको निर्माण भइरहेको छ। यसका लागि सरकारले विशेष ध्यान दिएको छ।",
    },
  ];

  if (isLoading) return <PageLoadingUI />;
  return (
    <div className="2xl:container mx-auto px-3 sm:px-8  py-8">
      <div>
        <h1 className="text-3xl font-semibold mb-6 lg:text-left">Notices</h1>
      </div>
      <div className="flex justify-end sm:items-center  items-start sm:flex-row flex-col gap-2">
        <Select
          defaultValue={district}
          // onChange={(e) => setDistrictValue(e.target.value)}
          onValueChange={(val) => setDistrictValue(val)}
        >
          <SelectTrigger className="w-[250px] h-10 bg-white">
            <SelectValue placeholder="Select a Notice" />
          </SelectTrigger>
          <SelectContent className=" bg-white">
            <SelectGroup>
              <SelectLabel>Notices</SelectLabel>
              {districts.map((item, idx) => (
                <SelectItem key={idx} value={item}>
                  {item}
                </SelectItem>
              ))}

              <SelectItem value="banana">Notice 2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div>
          <div className="w-[250px]  flex items-center border p-2 rounded-md bg-white  ">
            <input
              className="   outline-none  rounded-lg px-2  text-md  bg-white"
              placeholder="Search"
            />
            <Search className="  text-blue-800" size={18} />
          </div>
        </div>
      </div>
      <div className="mt-8 bg-[#ECF5FB] rounded-lg p-4 ">
        <h1 className="text-2xl font-semibold mb-6 lg:text-left ">
          Important Notices
        </h1>
        <div className="xl:mx-6 xl:py-8 md:m-2  ">
          <Carousel>
            <CarouselContent>
              {data &&
                data.map((item: any, index: number) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/3 xl:basis-1/3 lg:basis-1/3"
                  >
                    <Card className="xl:h-[160px] xl:w-[360px]  w-full h-full bg-white shadow-lg rounded">
                      <CardContent className="flex flex-col justify-between p-4 mb-4 lg:mb-0 h-full">
                        <div>
                          <h2 className="lg:text-xl font-medium mb-2 md:text-lg">
                            {item.title}
                          </h2>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">
                            {dateFormatter(item.updatedAt)}
                          </span>
                          <a
                            href={item.image.secure_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#183760] hover:underline"
                          >
                            Read More
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className=" -left-8 md:-left-10" />

            <CarouselNext className=" -right-8 md:-right-10" />
          </Carousel>
        </div>
      </div>

      <div className=" mt-8   rounded-lg ">
        {notices.map((item, index) => (
          <div
            key={index}
            className="flex justify-between w-full h-auto items-center p-2 sm:p-4 mt-4 container rounded-lg  bg-white shadow-md"
          >
            <div className="flex items-center cursor-pointer ">
              <div className="ml-4 flex flex-col gap-1 leading-relaxed">
                <h1 className=" text-lg sm:text-xl lg:text-xl font-medium ">
                  {item.title}
                </h1>
                <p className="text-sm lg:text-[16px] text-muted-foreground">
                  {item.decription}
                </p>
                <p className="text-sm lg:text-base mt-1">
                  <a href="#" className="text-[#183760] hover:underline">
                    Read More
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
