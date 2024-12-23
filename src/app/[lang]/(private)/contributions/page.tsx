"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// import EventCard from "@/components/events/EventCard";
import { Filter, Search, PlusCircleIcon, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// import { useQuery } from "react-query";
// import { getRequest } from "@/lib/requests";
import { dateFormatter } from "@/lib/date";
import { notFound } from "next/navigation";
import { dictionary } from "@/dictionary";
import ContributionDialog from "@/components/contributions/ContributionDialog";
import EventCard from "@/components/contributions/EventCard";
import { useGetContributions } from "@/hooks/query/contributions.query";
import { useGetEvents } from "@/hooks/query/events.query";
import PageLoadingUI from "@/components/PageLoadingUI";

const data = [
  {
    contributor_pic: "/avatar.jpg",
    contributor_name: "राम शर्मा",
    contributionOn: "२०२३-०१-१५",
    amount: "₹५,०००",
    purpose: "शिक्षा",
  },
  {
    contributor_pic: "/avatar.jpg",
    contributor_name: "सीता देवी",
    contributionOn: "२०२३-०२-२०",
    amount: "₹३,५००",
    purpose: "स्वास्थ्य",
  },
  {
    contributor_pic: "/avatar.jpg",
    contributor_name: "गोपाल खत्री",
    contributionOn: "२०२३-०३-२५",
    amount: "₹७,५००",
    purpose: "खेलकुद",
  },
  {
    contributor_pic: "/avatar.jpg",
    contributor_name: "माया गुरुङ",
    contributionOn: "२०२३-०४-१०",
    amount: "₹२,०००",
    purpose: "पर्यटन",
  },
  {
    contributor_pic: "/avatar.jpg",
    contributor_name: "सुरेश थापा",
    contributionOn: "२०२३-०५-१८",
    amount: "₹४,५००",
    purpose: "संस्कृति",
  },
  {
    contributor_pic: "/avatar.jpg",
    contributor_name: "कृष्णा आचार्य",
    contributionOn: "२०२३-०६-२२",
    amount: "₹६,०००",
    purpose: "विकास",
  },
  {
    contributor_pic: "/avatar.jpg",
    contributor_name: "राधा पाण्डे",
    contributionOn: "२०२३-०७-२९",
    amount: "₹३,०००",
    purpose: "कल्याण",
  },
  {
    contributor_pic: "/avatar.jpg",
    contributor_name: "धीरज लामिछाने",
    contributionOn: "२०२३-०८-३०",
    amount: "₹५,५००",
    purpose: "सामाजिक सेवा",
  },
];

const page = ({ params }: { params: { lang: string } }) => {
  const { lang } = params;
  const dict = dictionary[lang as keyof typeof dictionary];
  const [query, setQuery] = useState("");
  const [contributionQuery, setContributionQuery] = useState("");

  const { data: active_events, isLoading } = useGetEvents();
  console.log("events", active_events);
  let contributorslist: any = ["", ""];

  // const { data, isLoading, error } = useQuery(
  //   ["events", "contributing events"],
  //   () => getRequest({ endpoint: "" })
  // );

  //   const {
  //     data: contributors,
  //     isLoading: contributorsLoading,
  //     error: contributionError,
  //   } = useQuery(["events", "contributors"], () => getRequest({ endpoint: "/" }));

  // const { data } = useGetContributions();
  // console.log("yogdans", data);
  //   if (isLoading || contributorsLoading) {
  //     return (
  //       <div className="grid h-screen place-items-center ">
  //         <Loader className="animate-spin text-muted-foreground" size={20} />
  //       </div>
  //     );
  //   }

  //   if (error || contributionError) return notFound();

  //   const filteredData =
  //     data &&
  //     data.events.filter((event: any) =>
  //       event.name.toLowerCase().includes(query.toLowerCase())
  //     );

  //   const filteredContribution = contributors.data.filter((item: any) =>
  //     item.fullName.toLowerCase().includes(contributionQuery.toLowerCase())
  //   );

  // const filteredData = null;

  if (isLoading) return <PageLoadingUI />;

  return (
    <section className="relative">
      <Image
        className="absolute left-0 top-0 z-[-1]"
        src={"/contributions/VectorBottom.svg"}
        alt="vector"
        width={250}
        height={250}
      />

      <Image
        className="z-1 absolute bottom-0 right-0 z-[-1]"
        src={"/contributions/VectorTop.svg"}
        alt="vector"
        width={250}
        height={250}
      />

      <div className="min-h-screen p-4 2xl:container">
        {/* 
        <p className="mx-10 mt-8">
          {dict.home} &gt; {dict.contributions}
        </p> */}
        {/* ALL ACTIVE EVENTS */}
        <div className=" min-h-screen pb-10">
          <div className="relative">
            <div className="my-10 ">
              <h1 className="my-12 text-2xl font-semibold text-black md:text-3xl">
                {dict.active_events}
              </h1>
              <div className="my-10 flex flex-col gap-4 md:flex-row md:justify-end">
                <div className="flex max-w-full flex-wrap gap-4 md:flex-nowrap">
                  <div className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-500 px-2 ring-gray-300 focus-within:ring-2 focus-within:ring-offset-2">
                    <input
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                      }}
                      className="w-full bg-transparent py-2 outline-none focus:outline-none"
                      placeholder="Search..."
                    />
                    <Search className="text-primary" />
                  </div>

                  <button className="rounded-md border border-primary bg-white p-2">
                    <Filter className="text-primary" />
                  </button>
                  <ContributionDialog
                    accNo="0000000000"
                    accName="Adhikari  Donation Account"
                    bankName="Nabil Bank"
                    imgurl="/contributions/qr.png"
                  >
                    <Button className="flex gap-2">
                      <PlusCircleIcon /> {dict.contribute_to_org}
                    </Button>
                  </ContributionDialog>
                </div>
              </div>
              <div className="grid p-4 gap-6 grid-cols-1 sm:grid-cols-2    md:grid-cols-3 lg:grid-cols-4 ">
                {active_events &&
                  active_events?.map((event: any) => (
                    <EventCard
                      id={event._id}
                      imgurl={event.image.secure_url}
                      name={event.title}
                      desc={event.description}
                      organizedBy={event.organizer}
                    />
                  ))}
              </div>
              {active_events.length === 0 && (
                <div className=" grid gap-2 place-items-center">
                  <div className="  p-4 rounded-full">
                    <img
                      src="/contributions/notfound.svg"
                      alt="asa"
                      height={300}
                      width={300}
                      className="  rounded-full p-4"
                    />
                  </div>
                  <h2 className=" text-xl font-medium text-muted-foreground">
                    No Events Found
                  </h2>
                </div>
              )}
            </div>
          </div>

          {/* {active_events && active_events.length !== 0 && (
            <Pagination className="pb-4">
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
          )} */}
        </div>

        {/* ALL CONTRIBUTIONS TABLES */}
        {contributorslist && contributorslist.length !== 0 && (
          <div className=" my-12 min-h-[80vh] ">
            <div className="my-4 rounded-md bg-white p-4">
              <h1 className="text-lg font-semibold text-black md:text-3xl">
                {dict.all_contributions}
              </h1>
              <div className="mb-4 flex flex-col gap-4 md:flex-row md:justify-end">
                <div className="flex max-w-full gap-4">
                  <div className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-2 ring-gray-300 focus-within:ring-2 focus-within:ring-offset-2">
                    <input
                      className="w-full bg-transparent py-2 outline-none focus:outline-none"
                      placeholder="Search..."
                      onChange={(e) => setContributionQuery(e.target.value)}
                    />
                    <Search className="text-primary" />
                  </div>

                  <button className="rounded-md border border-primary bg-white p-2">
                    <Filter className="text-primary" />
                  </button>
                </div>
              </div>
            </div>

            <Table className="mb-10 bg-white rounded-lg overflow-hidden">
              <TableHeader className="bg-primary  text-white">
                <TableRow className=" text-white">
                  <TableHead className="text-white ">
                    {dict.contributor_name}
                  </TableHead>
                  <TableHead className="text-white">{dict.amount}</TableHead>
                  <TableHead className="text-white">
                    {dict.conribution_date}
                  </TableHead>
                  <TableHead className="text-white">{dict.purpose}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((invoice: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">
                      <div className=" flex items-center gap-2 whitespace-nowrap">
                        <img
                          alt="pic"
                          src={invoice.contributor_pic}
                          width={20}
                          height={20}
                          className="rounded-full h-8 w-8"
                        />
                        {invoice.contributor_name}
                      </div>
                    </TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>{invoice.contributionOn}</TableCell>
                    <TableCell className="text-center">
                      {invoice.purpose}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {active_events.length === 0 && (
              <div className=" grid gap-2 place-items-center">
                <div className="  p-4 rounded-full">
                  <img
                    src="/contributions/notfound.svg"
                    alt="asa"
                    height={300}
                    width={300}
                    className="rounded-full p-4"
                  />
                </div>
                <h2 className=" text-xl font-medium text-muted-foreground">
                  No Contributors Found
                </h2>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default page;
