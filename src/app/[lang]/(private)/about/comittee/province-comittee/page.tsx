"use client";
import React from "react";
import Image from "next/image";
import { useGetComitteeMembers } from "@/hooks/query/comittee.query";
import PageLoadingUI from "@/components/PageLoadingUI";
import { useLocalStorage } from "@uidotdev/usehooks";
import { generateYear } from "@/lib/year";
import locations from "@/data/locations.json";
import { useParams } from "next/navigation";

export default function page() {
  const years = generateYear();
  const { lang } = useParams();
  const [year, setYear] = useLocalStorage("year", years[0].title);
  const [province, setProvince] = useLocalStorage(
    "province",
    locations.provinceList[0].name
  );
  const route = `/user/committee?type=PROVINCE&year=${
    year.split("-")[0]
  }&province=${province}`;
  const { data, isLoading } = useGetComitteeMembers(route);

  if (isLoading) return <PageLoadingUI />;

  return (
    <div className="2xl:container mx-auto px-4 sm:px-8 my-8 py-0">
      <div className="text-left ">
        <div className="rounded-lg pb-10 flex flex-wrap gap-2">
          <h1 className="text-3xl font-medium">
            {lang === "en" ? "Province Comittee" : "प्रदेश समिति"}{" "}
          </h1>

          {/* SELECT YEAR */}
          <select
            onChange={(e) => setYear(e.target.value)}
            value={year}
            className="rounded-lg px-2 h-10"
          >
            {years.map((y, idx) => (
              <option key={idx} value={y.title}>
                {y.title}
              </option>
            ))}
          </select>

          {/* SELECT YEAR */}
          <select
            onChange={(e) => setProvince(e.target.value)}
            value={province}
            className="rounded-lg px-2 h-10"
          >
            {locations.provinceList.map((y, idx) => (
              <option key={idx} value={y.name}>
                {y.name}
              </option>
            ))}
          </select>
        </div>

        {data?.length !== 0 && (
          <div className="flex relative items-center mx-auto w-fit p-4 rounded-xl mb-10">
            <div className="text-center lg:text-left">
              <div className="lg:text-left text-center items-center">
                <Image
                  className="rounded-lg h-[300px] w-[250px] object-cover mb-2"
                  src={data[0]?.image.secure_url}
                  alt="literature collection"
                  width={250}
                  height={300}
                />
                <h1 className="text-xl font-semibold text-center">
                  {data[0]?.name}
                </h1>
                <h2 className="text-center font-medium text-muted-foreground">
                  {data[0]?.position}
                </h2>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-8 md:gap-16 lg:gap-24 justify-center">
          {data?.length === 0 ? (
            <div>
              <img width={500} height={500} src="/not-found.svg" alt="" />
              <h2 className="text-center font-medium text-3xl">
                Committee Not Found
              </h2>
            </div>
          ) : (
            data?.map(
              (item: any, index: number) =>
                index !== 0 && (
                  <div
                    key={index}
                    style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1" }}
                    className="p-4 rounded-xl"
                  >
                    <div className="flex relative justify-center">
                      <div className="text-center lg:text-left">
                        <div>
                          <Image
                            className="rounded-lg h-[300px] w-[250px] object-cover"
                            src={item.image.secure_url}
                            alt="literature collection"
                            width={200}
                            height={300}
                          />
                          <h1 className="text-lg font-medium text-center">
                            {item.position}
                          </h1>
                          <h2 className="text-center font-medium">
                            {item.name}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )
          )}
        </div>
      </div>
    </div>
  );
}
