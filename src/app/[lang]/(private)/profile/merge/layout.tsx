"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { dictionary } from "./dictionary";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";

const layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { lang } = useParams();
  const dict = dictionary[lang as keyof typeof dictionary];

  const menus = [
    {
      title: dict.receivedMerge,
      to: "/profile/merge",
    },
    {
      title: dict.receivedClaim,
      to: "/profile/merge/received-claim",
    },
    {
      title: dict.sentMerge,
      to: "/profile/merge/sent-merge",
    },
    {
      title: dict.sentClaim,
      to: "/profile/merge/sent-claim",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dict.allMergeReq}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <div className="w-fit md:rounded-full md:bg-neutral-200 text-sm flex flex-wrap">
            {menus.map((m, idx) => (
              <Link
                key={idx}
                href={m.to}
                className={cn(
                  "rounded-full px-3 py-1 outline-none",
                  pathname === m.to
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "",
                )}
              >
                {m.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="min-h-[50vh]">{children}</div>
      </CardContent>
    </Card>
  );
};

export default layout;
