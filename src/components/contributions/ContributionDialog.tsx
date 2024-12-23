import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";
import React, { FC, ReactNode } from "react";
import { dictionary } from "@/dictionary";
// import { getCookie } from "@/lib/cookies";
import { Label } from "@radix-ui/react-dropdown-menu";

type TContributionProps = {
  imgurl?: string;
  bankName?: string;
  accName?: string;
  accNo?: string;
  children?: ReactNode;
};
const ContributionDialog: FC<TContributionProps> = ({
  bankName,
  imgurl,
  accName,
  accNo,
  children,
}) => {
  //   const lang = getCookie("lang") || "np";
  const lang = "np";
  const dict = dictionary[lang as keyof typeof dictionary];
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>{dict.contribution_details}</DialogTitle>
        </DialogHeader>
        <div>
          {imgurl && (
            <img src={imgurl} alt="QR image" width={400} height={400} />
          )}
          <ul className="min-w-[250px]">
            {bankName && (
              <li className="flex gap-2">
                <Label>{dict.bank_name} :</Label> {bankName}
              </li>
            )}
            {accName && (
              <li className="flex gap-2">
                <Label>{dict.acc_name} :</Label> Adhikari Donation Account
              </li>
            )}
            {accNo && (
              <li className="flex gap-2">
                <Label>{dict.acc_no} :</Label> {accNo}
              </li>
            )}
          </ul>
        </div>
        <DialogFooter className="text-sm">
          <div>
            {dict.added_contribution}{" "}
            <Link
              href="/profile/contributions/new"
              className="text-blue-700 underline underline-offset-4"
            >
              {dict.claim_contribution}
            </Link>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContributionDialog;
