"use client";
import React from "react";
import Link from "next/link";
import { Newspaper, Wrench } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SideBar = () => {
  const pathname = usePathname();
  const isSecurityPage = pathname.endsWith("security");

  return (
    <div className="h-full min-w-[20%] pb-4 pr-4">
      <ul>
        <li
          className={cn(
            "rounded-l-md border-l-4 border-transparent px-2 py-2",
            !isSecurityPage ? "border-primary bg-blue-50 text-primary" : "",
          )}
        >
          <Link href="/profile/edit">
            <Newspaper size={16} className="inline" /> Basic Details
          </Link>
        </li>
        <li
          className={cn(
            "rounded-l-md border-l-4 border-transparent px-2 py-2",
            isSecurityPage ? "border-primary bg-blue-50 text-primary" : "",
          )}
        >
          <Link href="/profile/edit/security">
            <Wrench size={16} className="inline" /> Security
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
