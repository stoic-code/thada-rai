"use client";

/**
The position related all code are commented because of safari issue 
Do not use the following styles 

1. Position
2. webkit-transform-style
3. webkit-backface-visibility
4. transition
5. transform 
*/

import React, { useState } from "react";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { SpouseCircle, MoreWifeCircle, CircleImage } from "../TreeCommon";

// For Languages
import { dictionary } from "./dictionary";
import MergeSelect from "./MergeSelect";
import Details from "./Details";
import Menu from "./Menu";
import { useDeletePerson } from "@/hooks/mutations";
import { toast } from "sonner";

const PersonCircle = ({
  person,
  isUser,
  user,
}: {
  person: any;
  isUser: boolean;
  user: any;
}) => {
  // For language
  const [open, setOpen] = useState(false);
  const { lang } = useParams();
  const dict = dictionary[lang as keyof typeof dictionary];

  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const isSeachPage = pathname.endsWith("search");
  const isSeachPage = /^\/family\/[0-9]{10}$/.test(pathname);
  const isFullTreePage = pathname === "/banshwali";
  const readOnly = searchParams.get("readOnly") || isFullTreePage;

  const [mother, setMother] = useState("");
  const [type, setType] = useState("");

  const isMale = person.gender === "MALE";
  const hasWife = person.wives?.length > 0;

  const isEditor = user?.role === "EDITOR";
  const isOwner = person.ownerId === user?.id;

  const hasNoChildren = person.children?.length === 0;
  const userIsFather = person.fatherId === user?.mynode;
  const isMySon = isMale && userIsFather && hasNoChildren;

  // console.log("person: ", person);

  return (
    // <div className="" onClick={() => console.log("id: ", person.id)}>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/** 
           FOR FUTURE UPDATE TO DISPLAY MISSING NODE
           <div
             style={{
             height: "50px",
             width: "50px",
             borderRadius: "50%",
             border: "2px solid black",
             backgroundColor: "white",
             borderStyle: "dotted"
            }}
            /> */}
        <div title={person.name}>
          <CircleImage person={person} />
        </div>
      </DialogTrigger>
      <DialogContent className="text-left bg-white w-fit px-10 sm:px-4 rounded-md">
        <DialogHeader>
          <DialogTitle>
            {dict.details}
            <p className="text-[12] my-2">
              {dict.myGeneoalogyLevel}: {person.generation + 1}
            </p>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-4">
              <div className="card-scrollbar flex max-h-[320px] flex-col gap-2 overflow-y-auto px-2">
                <div className="flex flex-col gap-2 md:flex-row">
                  <div className="h-[200px] w-[200px] flex-shrink-0 overflow-hidden rounded-md">
                    <img
                      src={
                        person.imgurl
                          ? person.imgurl
                          : isMale
                          ? "/male.webp"
                          : "/female.webp"
                      }
                      alt={person.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-neutral-800">
                    <Details person={person} lang={lang} />
                    {!readOnly && (isEditor || isOwner) && (
                      <p className="text-left flex items-center gap-2">
                        <Link
                          href={
                            isMale
                              ? `/family/person/${person.id}/edit?father=${person.fatherId}`
                              : `/family/daughter/${person.id}/edit?father=${person.fatherId}`
                          }
                          className="text-blue-600 underline underline-offset-2"
                        >
                          Edit Details
                        </Link>
                        <DeleteAlert
                          type={isMale ? "person" : "daughter"}
                          setParentState={setOpen}
                          id={person.id}
                        />
                      </p>
                    )}
                  </div>
                </div>

                {person.wives &&
                  person.wives.length !== 0 &&
                  person.wives.map((w: any) => (
                    <div
                      key={w.id}
                      className="mt-3 flex flex-col gap-2 md:flex-row"
                    >
                      <div className="h-[200px] w-[200px] flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          className="w-full h-full object-cover"
                          src={w.imgurl ? w.imgurl : "/female.webp"}
                          alt={w.name}
                        />
                      </div>

                      <div className="text-neutral-800">
                        <Details lang={lang} person={w} />
                        {!readOnly && (isEditor || isOwner) && (
                          <p className="text-left flex gap-2">
                            <Link
                              href={`/family/spouse/${w.id}/edit`}
                              className="text-blue-600 underline underline-offset-2"
                            >
                              Edit Details
                            </Link>

                            <DeleteAlert
                              type="spouse"
                              setParentState={setOpen}
                              id={w.id}
                            />
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                {person.husband && (
                  <div className="flex flex-col gap-2 md:flex-row ">
                    <div className="h-[200px] w-[200px] flex-shrink-0 overflow-hidden rounded-md">
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

                    <div className="text-neutral-800 space-x-2">
                      <Details lang={lang} person={person.husband} />
                      {!readOnly && (isEditor || isOwner) && (
                        <Link
                          href={`/family/inlaw/${person.husband.id}/edit`}
                          className="text-blue-600 underline underline-offset-2"
                        >
                          Edit Details
                        </Link>
                      )}
                      {isOwner && (
                        <DeleteAlert
                          type="inlaw"
                          setParentState={setOpen}
                          id={person.husband.id}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {!isSeachPage && !readOnly && (
                  <Menu
                    person={person}
                    isMale={isMale}
                    isOwner={isOwner}
                    hasWife={hasWife}
                    isEditor={isEditor}
                    isUser={isUser}
                    isMySon={isMySon}
                  />
                )}
                {!isOwner && isSeachPage && isMale && !readOnly && (
                  <MergeSelect
                    person={person}
                    mother={mother}
                    setMother={setMother}
                    type={type}
                    setType={setType}
                    lang={lang}
                  />
                )}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const Node = ({
  person,
  isUser,
  user,
  depth,
}: {
  person: any;
  isUser: boolean;
  user: any;
  depth: number;
}) => {
  const isMale = person.gender === "MALE";
  return (
    <div className="flex h-[100px] w-[180px]">
      <PersonCircle user={user} person={person} isUser={isUser} />
      {person.wives && person.wives.length !== 0 && (
        <SpouseCircle isMale={isMale} spouse={person.wives[0]} />
      )}
      {/* {person.wives && person.wives.length > 1 && (
        <SpouseCircle isMale={isMale} spouse={person.wives[1]} />
      )} */}
      {person.husband && (
        <SpouseCircle isMale={isMale} spouse={person.husband} />
      )}
      {person.wives && person.wives.length > 1 && (
        <MoreWifeCircle moreWife={person.wives.length - 1} />
      )}
      {/* <motion.div
        initial={{ scale: 1, opacity: 1, x: -15 }}
        animate={{ scale: [1, 1.1, 1], opacity: [1, 0.5, 1], x: -15 }}
        transition={{ duration: 1, repeat: Infinity }}
        className="h-3 w-3 rounded-full bg-blue-500"
      ></motion.div> */}
    </div>
  );
};

const DeleteAlert = ({
  id,
  setParentState,
  type,
}: {
  id: string;
  setParentState: any;
  type: "person" | "spouse" | "daughter" | "inlaw";
}) => {
  const { mutateAsync } = useDeletePerson();
  const isPerson = type === "person";
  const isSpouse = type === "spouse";
  const isDaughter = type === "daughter";
  const inLaw = type === "inlaw";

  const handleDelete = () => {
    const route = isPerson
      ? `/family/person/${id}`
      : isSpouse
      ? `/family/wife/${id}`
      : isDaughter
      ? `/family/daughter/${id}`
      : inLaw
      ? `/family/husband/${id}`
      : "";

    const promise = mutateAsync(route).then(() => setParentState(false));
    toast.promise(promise, {
      loading: "Deleting person please wait ....",
      success: "Deleted person's data successfully !!",
      error: (err) => err.message || "Something went wrong !!",
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="underline outline-none underline-offset-2 text-destructive">
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Node;
