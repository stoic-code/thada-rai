import React, { FC } from "react";
import Image from "next/image";
import { Card, CardHeader, CardDescription } from "../ui/card";
import Link from "next/link";

type TEventProps = {
  id: string;
  imgurl: string;
  name: string;
  desc: string;
};

const EventCard: FC<TEventProps> = ({ id, imgurl, name, desc }) => {
  return (
    <Link href={`/events/${id}`}>
      <Card className="p-0 shadow-md">
        <Image
          src={imgurl}
          alt={name}
          className="h-60 rounded-t-xl object-cover"
          height={100}
          width={500}
        />
        <CardHeader>
          <h1 className="line-clamp-1 text-lg font-medium md:text-xl md:font-semibold">
            {name}
          </h1>
          <CardDescription className="line-clamp-5 text-sm">
            {desc}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default EventCard;
