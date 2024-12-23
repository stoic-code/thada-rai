import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { Calendar } from "lucide-react";

const AlekhCard = ({
  thumbnail,
  title,
  desc,
  author,
  createdAt,
}: {
  thumbnail?: string;
  title: string;
  desc: string;
  createdAt: string;
  author: string;
}) => {
  return (
    <Card className="shadow-md">
      <Image
        className="h-48 rounded-t-xl object-cover"
        src={thumbnail ? thumbnail : "/alekh/alekh.png"}
        alt="aalekh"
        height={200}
        width={500}
      />
      <CardHeader>
        <CardTitle className="line-clamp-1 text-lg">{title}</CardTitle>
        <div
          dangerouslySetInnerHTML={{ __html: desc }}
          className="line-clamp-2 max-h-[3.6m]"
        ></div>
      </CardHeader>
      <CardFooter className="flex items-center justify-between border-t py-2 text-sm text-gray-500">
        <span>{author}</span>
        <span className="h-5 w-[1px] bg-gray-400"></span>
        <span className="flex items-center gap-2">
          <Calendar />
          {createdAt}
        </span>
      </CardFooter>
    </Card>
  );
};

export default AlekhCard;
