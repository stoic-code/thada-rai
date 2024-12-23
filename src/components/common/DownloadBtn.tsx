"use client";
import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type TDownloadProps = {
  className?: string;
  children: ReactNode;
};

export default function DownloadBtn({ className, children }: TDownloadProps) {
  async function handleDownload() {
    try {
      console.log("Download button clicked");

      const res = await fetch("/history.pdf");

      // if (!res.ok) {
      //   throw new Error("Network Error.");
      // }
      console.log("Error response:", res);

      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = "history.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download error:", err);
    }
  }

  return (
    <div>
      <Button
        className={cn(
          "bg-yellow-500 text-black hover:bg-yellow-500/80 ",
          className
        )}
        onClick={() => handleDownload()}
      >
        {children}
      </Button>
    </div>
  );
}
