import React from "react";
import NotificationCard from "@/components/profile/NotificationCard";
import TransactionTable from "@/components/profile/TransactionTable";
// import MembershipCard from "@/components/profile/MembershipCard";

const page = ({ params }: { params: { lang: string } }) => {
  return (
    <section className="">
      <div className="mx-auto flex flex-col gap-8 lg:w-[90%]">
        <NotificationCard />
        <TransactionTable lang={params.lang} />
        {/* 
        <MembershipCard /> */}
      </div>
    </section>
  );
};

export default page;
