import React, { FC } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import Link from "next/link";

type TEventProps = {
  id: string;
  imgurl: string;
  name: string;
  desc: string;
  organizedBy: string;
};

const EventCard: FC<TEventProps> = ({
  id,
  imgurl,
  name,
  desc,
  organizedBy,
}) => {
  console.log("title", name);
  return (
    <Link href={`/contributions/${id}`}>
      <div className="p-4 shadow-md space-y-4   h-full   bg-white rounded-lg">
        <div className="">
          <h1 className="line-clamp-1 text-base font-medium md:text-lg md:font-semibold">
            {name}
          </h1>
          <div className=" flex items-center gap-2 text-xs whitespace-nowrap">
            <span>Organized By:</span>
            <p className="">{organizedBy}</p>
          </div>
        </div>
        <Image
          src={imgurl}
          alt={name}
          className="h-40 rounded-xl object-cover"
          height={100}
          width={400}
        />
        <p className=" line-clamp-3 text-muted-foreground">{desc}</p>
      </div>
    </Link>
  );
};

export default EventCard;
