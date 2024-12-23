"use client";
import React, { useState } from "react";
import { Download, FileText } from "lucide-react";
import { useGetDownloads } from "@/hooks/query/downloads.query";
import PageLoadingUI from "@/components/PageLoadingUI";
import { useParams } from "next/navigation";

export default function Page() {
  const { lang } = useParams();
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const { data, isLoading } = useGetDownloads();

  const handleDownload = async ({
    title,
    url,
  }: {
    title: string;
    url: string;
  }) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      setDownloadUrl(blobUrl);

      // Triggering a click on the link to start the download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title}.pdf`; // You can set the desired filename here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  if (isLoading) return <PageLoadingUI />;
  return (
    <div className="flex flex-col px-8 2xl:container py-10">
      <div>
        <h1 className="text-3xl lg:text-3xl pb-6 font-semibold">
          {lang === "np" ? "डाउनलोड" : "Downloads"}
        </h1>
      </div>
      {data.map((item: any, index: number) => (
        <div
          key={index}
          className="flex justify-between w-full items-center px-2 py-4 mt-4 container rounded-lg  bg-white shadow-md"
        >
          <div className="flex items-center ">
            {/* <Image
              src="/download/paper.svg"
              alt="Report"
              width={50}
              height={50}
            /> */}
            <FileText
              size={50}
              strokeWidth={"1px"}
              className=" flex-shrink-0"
            />
            <div className="ml-4 flex flex-col">
              <h1 className="text-xl lg:text-xl font-medium ">{item.title}</h1>
              <p className="text-xs  sm:text-sm lg:text-base text-gray-600">
                Click on the download icon to download the document
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              handleDownload({ title: item.title, url: item.document_url })
            }
            className=" sm:mr-4"
          >
            <Download
              size={22}
              className="cursor-pointer text-blue-800 text-bold"
            />
          </button>
        </div>
      ))}
    </div>
  );
}
