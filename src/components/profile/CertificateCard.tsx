import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import Certificate from "@/assets/profile/Certificate.svg";
import CertificateA4 from "./CertificateA4";

const CertificateCard = () => {
  return (
    <Card className="overflow-auto">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-primary">Your Contributions</CardTitle>
          <Link
            href="/contributions"
            className="text-primary underline underline-offset-2"
          >
            Download All
          </Link>
        </div>
      </CardHeader>
      <CardContent className="overflow-auto">
        <div className="flex flex-col  gap-8 md:gap-8 scale-[30%] md:scale-[60%] xl:scale-[70%] transform origin-top-left">
          <CertificateA4 />
          <CertificateA4 />
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificateCard;
