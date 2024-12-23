import React from "react";
import IdentityCard from "@/components/profile/id_card/IdentityCard";
import { CustomBadge } from "@/components/ui/CustomBadge";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { engNumToNepNum, nepaliDateFormatter } from "@/lib/date";
import BikramSambat from "@askbuddie/bikram-sambat";
import { getSession } from "@/actions/auth.action";

const page = async () => {
  const { accessToken: token } = await getSession();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/idcard/status`,
    {
      method: "GET",
      headers: { Authorization: `bearer ${token}` },
      cache: "no-store",
    },
  );

  if (res.status !== 200) redirect("/profile/idcard/new");

  const data = await res.json();
  const isStatusPending = data.status === "pending";
  const isStatusRejected = data.status === "rejected";

  if (isStatusRejected) redirect("/profile/idcard/new");

  const {
    fullName,
    dob,
    phone,
    birthPlace,
    province,
    district,
    local,
    ward,
    bloodGroup,
    profession,
    designation,
    gender,
    membershipNo,
    status,
    updatedAt,
    image: { secure_url },
  } = data.idCard;

  return (
    <div>
      <h1 className="px-4 pt-4 text-xl">
        Status:{" "}
        <CustomBadge
          color={isStatusPending ? "yellow" : "green"}
          className="inline-flex text-sm"
        >
          {isStatusPending ? "Pending" : "Approved"}
        </CustomBadge>{" "}
        {isStatusPending && (
          <span className="text-base text-muted-foreground">
            (ID card approval may take 1-3 business day(s).)
          </span>
        )}
      </h1>
      <div className={cn(isStatusPending && "blur-[3px]")}>
        <div className="px-3">
          <IdentityCard
            values={{
              status,
              membershipNo,
              fullName,
              profession,
              gender,
              bloodGroup,
              ward,
              local,
              district,
              province,
              birthPlace,
              phone,
              designation,
              dob: nepaliDateFormatter(dob),
              updatedAt: engNumToNepNum(
                BikramSambat.fromAD(updatedAt).toString(),
              ),
              image: secure_url,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
