"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { Loader2, MapPin, Network } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { removeEmptyFields } from "@hyper/web-common";
import { useGetSearchResult } from "@/hooks/query";
import Link from "next/link";

const page = () => {
  const searchParams = useSearchParams();
  const query = {
    name: searchParams.get("name") || "",
    province: searchParams.get("province") || "",
    district: searchParams.get("district") || "",
    local: searchParams.get("local") || "",
    status: searchParams.get("status") || "",
    origin: searchParams.get("origin") || "",
    nickname: searchParams.get("nickname") || "",
    childIndex: searchParams.get("childIndex") || "",
    page: searchParams.get("page") || "1",
  };
  const filteredQUery = removeEmptyFields(query);
  const { data, isLoading, error } = useGetSearchResult(filteredQUery);

  if (isLoading)
    return (
      <div className="min-h-screen">
        <div className="flex h-screen w-full items-center justify-center">
          <Loader2 className="animate-spin text-muted-foreground" />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen">
        <div className="flex h-screen w-full items-center justify-center">
          Something went wrong
        </div>
      </div>
    );

  if (data.length == 0)
    return (
      <div className="min-h-screen">
        <div className="flex h-screen w-full items-center justify-center text-muted-foreground">
          No Data Found
        </div>
      </div>
    );

  return (
    <>
      <div className="grid w-full gap-8 px-2 pt-20 text-neutral-500 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:pt-5 xl:grid-cols-3">
        {data.map((p: any, idx: number) => {
          const totalChildren = p.wives.reduce(
            (acc: number, wife: any) => acc + wife.childrenCount,
            0
          );
          return (
            <div
              key={idx}
              className="relative mt-4 flex max-w-2xl flex-col rounded-xl bg-white p-5 shadow-md"
            >
              <Link
                title="View in banshwali tree"
                href={`/family/${p.ownerId}?fromId=true`}
                className="absolute right-1 top-1 p-1"
              >
                <Network size={20} />
              </Link>
              <div className="flex">
                <Image
                  src={p.imgurl ? p.imgurl : "/male.webp"}
                  alt="man"
                  width={100}
                  height={100}
                  className="h-[80px] w-[80px] rounded-full border-2 border-neutral-400 object-cover"
                />
                {p.wives.length !== 0 &&
                  p.wives.map(
                    (w: any, idx: number) =>
                      idx < 4 && (
                        <Image
                          key={idx}
                          src={w.imgurl ? w.imgurl : "/female.webp"}
                          alt="man"
                          width={100}
                          height={100}
                          className="h-[80px] w-[80px] rounded-full border-2 border-neutral-400 object-cover"
                        />
                      )
                  )}
              </div>
              <div className="space-y-2 ">
                <h3 className="font-semibold capitalize text-black">{`${p.firstName} ${p.lastName}`}</h3>
                <div className="space-y-1 text-sm">
                  {p.local && p.district && (
                    <div className="flex items-center gap-1 pb-2">
                      <MapPin size={16} /> {p.local}, {p.district}
                    </div>
                  )}
                </div>
              </div>

              <ul className="text-md space-y-1 text-sm">
                {/* <li>Spouse: Sunita Adhikari </li>
              <li>Father: Ram Adhikari </li>
               */}
                {p.motherName && <li>Mother : {p.motherName}</li>}

                {totalChildren !== 0 && (
                  <li>No of Children(s): {totalChildren}</li>
                )}

                {p.remarks && (
                  <li className="line-clamp-2">Remarks: {p.remarks}</li>
                )}

                {p.origin && (
                  <li className="line-clamp-2">Place of Origin: {p.origin}</li>
                )}

                {p.nickName && (
                  <li className="line-clamp-2">Nickname: {p.nickName}</li>
                )}

                {p.father && (
                  <li>
                    Father's Name : {p.father.firstName} {p.father.lastName}
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
      {data.length > 10 && (
        <Pagination className="py-4">
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
      )}
    </>
  );
};

export default page;
