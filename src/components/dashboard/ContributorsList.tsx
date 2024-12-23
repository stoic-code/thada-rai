"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import CommonHeading from "./CommonHeading";
import { useParams } from "next/navigation";

const data = [
  {
    contributor_pic: "/avatar.jpg",
    contributor_name: "राम शर्मा",
    contributionOn: "२०२३-०१-१५",
    amount: "रु ५,०००",
    purpose: "शिक्षा",
  },
  {
    contributor_pic: "/avatar.jpg",
    contributor_name: "सीता देवी",
    contributionOn: "२०२३-०२-२०",
    amount: "रु ३,५००",
    purpose: "स्वास्थ्य",
  },
  {
    contributor_pic: "/avatar.jpg",
    contributor_name: "गोपाल खत्री",
    contributionOn: "२०२३-०३-२५",
    amount: "रु ७,५००",
    purpose: "खेलकुद",
  },
  {
    contributor_pic: "/avatar.jpg",
    contributor_name: "माया गुरुङ",
    contributionOn: "२०२३-०४-१०",
    amount: "रु २,०००",
    purpose: "पर्यटन",
  },
  {
    contributor_pic: "/avatar.jpg",
    contributor_name: "सुरेश थापा",
    contributionOn: "२०२३-०५-१८",
    amount: "रु ४,५००",
    purpose: "संस्कृति",
  },
  {
    contributor_pic: "/avatar.jpg",
    contributor_name: "कृष्णा आचार्य",
    contributionOn: "२०२३-०६-२२",
    amount: "रु ६,०००",
    purpose: "विकास",
  },
  {
    contributor_pic: "/avatar.jpg",
    contributor_name: "राधा पाण्डे",
    contributionOn: "२०२३-०७-२९",
    amount: "रु ३,०००",
    purpose: "कल्याण",
  },
  {
    contributor_pic: "/avatar.jpg",
    contributor_name: "धीरज लामिछाने",
    contributionOn: "२०२३-०८-३०",
    amount: "रु ५,५००",
    purpose: "सामाजिक सेवा",
  },
];

export default function ContributorsList() {
  const { lang } = useParams();

  return (
    <div>
      <div className="space-y-4 py-10">
        <CommonHeading
          title={lang === "en" ? "Top Contributors" : "योगदानकर्ताहरूको सूची"}
          link_title={lang === "en" ? "See All" : "थप हेर्नुहोस"}
          link_src="/contributions"
        />

        {/* TABLE PART */}
        <div className=" w-full sm:w-[90%] mx-auto 2xl:w-[95%] pt-4">
          <Table className="rounded-lg overflow-hidden">
            <TableHeader className="rounded-lg bg-primary hover:bg-primary text-white h-12">
              <TableRow className="text-white rounded-lg hover:bg-primary ">
                <TableHead className=" text-white min-w-[200px]">
                  {lang === "en" ? "Contributor Name" : "दाताको नाम"}
                </TableHead>
                <TableHead className="text-white min-w-[150px]">
                  {lang === "en" ? "Amount" : "रकम रु."}
                </TableHead>
                <TableHead className="text-white whitespace-nowrap">
                  {lang === "en" ? "Contribution Date" : "योगदान मिति"}
                </TableHead>
                <TableHead className="text-center text-white">
                  {lang === "en" ? "Purpose" : "योगदानको उद्देश्य"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-lg border">
              {data.map((invoice, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">
                    <div className=" flex items-center gap-2 whitespace-nowrap">
                      <img
                        alt="pic"
                        src={invoice.contributor_pic}
                        width={30}
                        height={30}
                        className="rounded-full h-12 w-12"
                      />
                      {invoice.contributor_name}
                    </div>
                  </TableCell>
                  <TableCell className=" text-nowrap">
                    {invoice.amount}
                  </TableCell>
                  <TableCell>{invoice.contributionOn}</TableCell>
                  <TableCell className="text-center">
                    {invoice.purpose}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* <img alt="pic" src={"/public/avatar.jpg"} width={20} height={20} /> */}
      </div>
    </div>
  );
}
