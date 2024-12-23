"use client";
import React, { useRef } from "react";
import * as htmlToImage from "html-to-image";
import { dictionary } from "@/app/[lang]/(private)/profile/merge/dictionary";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import { PenSquare, PlusCircle, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { dateFormatter, engNumToNepNum } from "@/lib/date";
import { toast } from "@/components/ui/use-toast";
import { useGetPitris } from "@/hooks/query/profile.query";
import { useParams } from "next/navigation";

const PitriSradhanjali = () => {
  const { lang } = useParams();
  const { data, refetch } = useGetPitris();

  const handleDelete = async (id: string) => {
    // try {
    //   const res = await deleteRequest(`/pitri/${id}`);
    //   if (res.status === 200) {
    //     // If deletion is successful, display a success toast
    //     toast({
    //       variant: "success",
    //       title: "Success !!",
    //       description: "Successfully deleted pitri's information !!",
    //     });
    //     // Refetch the data to update the UI
    //     refetch();
    //   } else {
    //     // If deletion fails, display an error toast
    //     toast({
    //       variant: "destructive",
    //       title: "Failed !!",
    //       description: "Something went wrong !!",
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error while deleting:", error);
    //   // If there is an error during deletion, display an error toast
    //   toast({
    //     variant: "destructive",
    //     title: "Failed !!",
    //     description: "Something went wrong !!",
    //   });
    // }
  };

  const dict = dictionary[lang as keyof typeof dictionary];
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // Check if cardRef has current value
    if (cardRef.current) {
      // Use html-to-image library to convert the HTML element to an image
      htmlToImage
        .toPng(cardRef.current)
        .then(function (dataUrl) {
          // Create a temporary link element
          const link = document.createElement("a");
          link.download = "identity-card.png"; // Set the download file name
          link.href = dataUrl; // Set the href attribute to the data URL
          // Trigger the download process
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(function (error) {
          console.error("Error while downloading:", error);
        });
    }
  };

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle className="flex flex-col justify-between gap-y-4 md:flex-row">
          <div>
            {dict.annualTribute}{" "}
            <Link href="/profile/others/pitri">
              <PlusCircle className="inline text-blue-500" />
            </Link>
            <CardDescription className="pt-1 font-normal">
              आफ्नो पितृ को श्रदान्जली को लागि सम्झना लेख्नुहोस{" "}
            </CardDescription>
          </div>
          <div className="pb-4 pr-4">
            <Button className="w-fit" size="sm" onClick={handleDownload}>
              Download All
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent
        className="grid min-h-80 gap-6 bg-white md:grid-cols-2"
        ref={cardRef}
      >
        {data &&
          data.length > 0 &&
          data?.map((d: any, idx: number) => (
            <SingleCard
              handleDelete={() => handleDelete(d._id.toString())}
              dict={dict}
              key={idx}
              data={d}
            />
          ))}
      </CardContent>
    </Card>
  );
};

const SingleCard = ({
  dict,
  data,
  handleDelete,
}: {
  dict: any;
  data: any;
  handleDelete: () => void;
}) => {
  return (
    <div className="group relative h-fit rounded-md border p-2 transition-all duration-150 hover:bg-muted">
      <Link
        href={`/profile/others/pitri/${data._id.toString()}`}
        className="absolute right-8 top-1 text-blue-500 opacity-0 duration-300 hover:bg-muted group-hover:opacity-100"
      >
        <PenSquare size={20} />
      </Link>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="absolute right-1 top-1 text-red-500 opacity-0 duration-300 hover:bg-muted group-hover:opacity-100">
            <Trash size={20} />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              this information and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <h2 className="font-semibold">{dict[data.type]}</h2>
      <ul className="pt-2">
        <li>
          {dict.name}: {data.name}
        </li>
        <li>
          {dict.date}: {engNumToNepNum(dateFormatter(data.dod))}
        </li>
        <li>
          {dict.tithi}: {data.tithi}
        </li>
      </ul>
    </div>
  );
};

export default PitriSradhanjali;
