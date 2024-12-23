"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC, ReactNode, useEffect } from "react";

type TYogdanProps = {
  name: string;
  description: string;
  image: string;
  type: string;
  birthPlace: string;
  status: string;
  children: ReactNode;
};

const YogdanPopup: FC<TYogdanProps> = ({
  image,
  name,
  description,
  type,
  birthPlace,
  status,
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger className="text-left w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription asChild></DialogDescription>
        </DialogHeader>

        <div className="custom-scrollbar max-h-[70vh] space-y-2 overflow-y-auto py-2">
          <img
            className="h-[200px] w-[200px] rounded-xl object-cover object-top"
            src={image}
            alt={name}
          />
          <p>
            <span className="font-bold">Yogdan Type : </span> {type}
          </p>
          <p>
            <span className="font-bold">Birthplace : </span> {birthPlace}
          </p>
          <p>{description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default YogdanPopup;
