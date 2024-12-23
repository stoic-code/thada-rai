"use client";

import PageLoadingUI from "@/components/PageLoadingUI";
import { useGetGalleries } from "@/hooks/query/gallery.query";
import { Images } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default function page() {
  const { lang } = useParams();
  const { data, isLoading } = useGetGalleries();
  // console.log("gallery", data);

  if (isLoading) return <PageLoadingUI />;
  return (
    <div>
      <div className="2xl:container px-4  py-8">
        <h2 className="text-2xl font-semibold">
          {lang == "en" ? "Photo Gallery" : "फोटो ग्यालेरी"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 pt-10">
          {data &&
            data?.map((g: any, idx: number) => {
              return (
                <Link
                  href={`/gallery/${g._id}`}
                  key={idx}
                  className="space-y-2 w-full border bg-white rounded-md py-2 px-4 shadow-xl"
                >
                  <div className="flex w-full justify-between  whitespace-nowrap items-center gap-4">
                    <p>{g.title}</p>
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
        {/* {data.length !== 0 && (
          <div className=" mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )} */}
        {data.length === 0 && (
          <div className=" grid place-items-center mt-20">
            <img
              src="/dummy/nogallery.svg"
              alt="no"
              height={200}
              width={200}
              className=" w-40 sm:w-60"
            />
            <p className=" text-xl  text-muted-foreground font-semibold">
              Empty Gallery
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
