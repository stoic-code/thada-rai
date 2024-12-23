"use client";
import { useGetMergeRequest } from "@/hooks/query";

import { CustomBadge as Badge } from "@/components/ui/CustomBadge";
import { Check, Eye, X } from "lucide-react";
import { dateFormatter } from "@/lib/date";
import { dictionary } from "../dictionary";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "../loading";

const page = () => {
  const { lang } = useParams();
  const route = "/merge/claimrequests/sent";
  const { data, isLoading } = useGetMergeRequest(route);
  const dict = dictionary[lang as keyof typeof dictionary];

  if (isLoading) return <Loading />;

  return (
    <Table>
      {/* 
      <TableCaption>{dict.aListOfAll}</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead>{dict.date}</TableHead>
          <TableHead>{dict.requestTo}</TableHead>
          <TableHead>{dict.status}</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 &&
          data.map((req: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">
                {dateFormatter(req.createdAt)}
              </TableCell>
              <TableCell className="font-medium">{req.fromName}</TableCell>
              <TableCell className="font-medium">
                <Badge
                  color={
                    req.status === "VERIFIED"
                      ? "green"
                      : req.status === "REJECTED"
                        ? "red"
                        : "yellow"
                  }
                >
                  {req.status === "VERIFIED"
                    ? dict.verified
                    : req.status === "REJECTED"
                      ? dict.rejected
                      : dict.pending}
                </Badge>
              </TableCell>
              <TableCell className="flex gap-6 font-medium">
                {req.status === "VERIFIED" ? (
                  <span className="flex gap-2">
                    <Check className="text-green-500" /> Merged
                  </span>
                ) : req.status === "REJECTED" ? (
                  <span className="flex gap-2">
                    <X className="text-red-500" /> {dict.rejected}
                  </span>
                ) : (
                  <Link
                    className="flex gap-2"
                    href={`/view-tree?readOnly=true&reqId=${req.id}&mergethis=${req.mergethis}&mergehere=${req.mergehere}&tab=sent-claim&claimthis=${req.claimthis}`}
                  >
                    {dict.view} <Eye className="text-blue-500" />
                  </Link>
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default page;
