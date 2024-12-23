import React, { FC } from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { PenBox, Pencil } from "lucide-react";

type TCardProps = {
  image: string;
  desc: string;
  name: string;
  author?: string;
};

const CardWithImgCircle = ({ author, name, image, desc }: TCardProps) => {
  return (
    <Card className="relative pt-10 shadow-md h-full">
      <div className="absolute left-4 top-[-2rem] flex h-20 w-20 items-center justify-center rounded-full border-primary bg-primary">
        <img
          alt="avatar"
          className="h-[95%] w-[95%] rounded-full bg-cover object-cover"
          src={image ? image : "/avatar.jpg"}
          width={100}
          height={100}
        />
      </div>
      <div className="absolute left-28 top-4 line-clamp-2 font-semibold">
        <Pencil size={16} className="inline" /> {author}
      </div>
      <CardHeader>
        <CardTitle className="text-md md:text-xl line-clamp-2">
          {name}
        </CardTitle>
        <CardDescription
          className="line-clamp-3"
          dangerouslySetInnerHTML={{ __html: desc }}
        ></CardDescription>
      </CardHeader>
    </Card>
  );
};

export default CardWithImgCircle;
