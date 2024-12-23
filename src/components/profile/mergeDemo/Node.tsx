import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import {
  CircleImage,
  MoreWifeCircle,
  SpouseCircle,
} from "@/components/tree/TreeCommon";
import Details from "@/components/tree/diagram/Details";
import { useParams } from "next/navigation";

const PersonCircle = ({ person }: { person: any }) => {
  const { lang } = useParams();
  const isMale = person.gender === "male";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div title={person.name}>
          <CircleImage person={person} />
        </div>
      </DialogTrigger>
      <DialogContent className="text-left">
        <DialogHeader>
          <DialogTitle>विवरण</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-4">
              <div className="card-scrollbar flex max-h-[320px] flex-col gap-2 overflow-auto">
                <div className="flex flex-col gap-2 md:flex-row">
                  <img
                    className="h-[150px] w-[200px] flex-shrink-0 rounded-md object-cover object-center"
                    src={
                      person.imgurl
                        ? person.imgurl
                        : isMale
                        ? "/male.webp"
                        : "/female.webp"
                    }
                    alt={person.name}
                    width={200}
                    height={150}
                  />
                  <div className="text-neutral-800">
                    <Details lang={lang} person={person} />
                  </div>
                </div>

                {person.wives &&
                  person.wives.length !== 0 &&
                  person.wives.map((w: any) => (
                    <div key={w.id} className="flex flex-col gap-2 md:flex-row">
                      <Image
                        className="h-[150px] w-[200px] rounded-md object-cover object-center"
                        src={w.imgurl}
                        alt={w.name}
                        width={150}
                        height={150}
                      />

                      <div className="text-neutral-800">
                        {<Details person={w} lang={lang} />}
                      </div>
                    </div>
                  ))}

                {person.husband && (
                  <div className="flex flex-col gap-2 md:flex-row ">
                    <div className="h-[150px] w-[200px] flex-shrink-0 overflow-hidden rounded-md">
                      <img
                        className="w-full"
                        src={
                          person.husband.imgurl
                            ? person.husband.imgurl
                            : "/male.webp"
                        }
                        alt={person.husband.name}
                        width={200}
                        height={150}
                      />
                    </div>

                    <div className="text-neutral-800">
                      <Details lang={lang} person={person.husband} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const Node = ({ person }: { person: any }) => {
  return (
    <div
      style={{
        height: "100px",
        width: "140px",
        display: "flex",
      }}
    >
      <PersonCircle person={person} />
      {person.wives && person.wives.length !== 0 && (
        <SpouseCircle isMale={false} spouse={person.wives[0]} />
      )}
      {person.wives && person.wives.length > 1 && (
        <MoreWifeCircle moreWife={person.wives.length - 1} />
      )}
      {person.husband && <SpouseCircle isMale={true} spouse={person.husband} />}
    </div>
  );
};

export default Node;
