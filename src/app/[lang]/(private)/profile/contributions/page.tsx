import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
// import Certificate from "@/components/profile/ContributionCertificate";

const page = () => {
  return (
    <div className="p-2">
      <Link
        href="/profile/contributions/new"
        className="mb-4 flex gap-1 text-blue-500"
      >
        Add Contribution <PlusCircle />
      </Link>
      {/* 
      <CertificateCard /> 

        WARN: This was causing the global css webpack related error.
        This need to be redone. A new svg component for certificate should 
        be recreated and then we should do this part again

      <Certificate />
      */}
    </div>
  );
};

export default page;
