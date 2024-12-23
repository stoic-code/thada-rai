import React from "react";
import Image from "next/image";
import Logo from "@/assets/Logo1.svg";
import Logo2 from "@/assets/Logo.svg";
import Signature from "@/assets/profile/Signature.svg";
import { Imperial_Script, Kadwa } from "next/font/google";
import { cn } from "@/lib/utils";

const imperial = Imperial_Script({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const kadwa = Kadwa({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const CertificateA4 = () => {
  return (
    <div className="p-8 h-[595px] min-w-[842px] border rounded-xl text-center flex flex-col justify-around shadow-neutral-300 shadow-lg">
      <div className="flex justify-between items-start">
        <Image src={Logo2} alt="logo" />
        <div>
          <h1 className="font-semibold text-2xl">Adhikari Sewa Sama</h1>
          <p className="text-xs">Koshi, Jhapa, ArjunDhara 00001</p>
        </div>
        <Image src={Logo} alt="logo" />
      </div>
      <div>
        <div className="mt-20">
          <h2
            className={cn(
              kadwa.className,
              "text-primary text-4xl font-semibold tracking-wide"
            )}
          >
            Certificate
          </h2>
          <p>of contribution</p>
        </div>

        <p className="my-8">This certificate is presented to</p>

        <div className="flex flex-wrap text-center justify-center">
          <span
            className={cn(
              imperial.className,
              "text-5xl border-b-2 border-black pb-2 px-4 text-primary"
            )}
          >
            Bhimsen Adhikari
          </span>
        </div>

        <p className="mt-16">
          For his/her contribution in EVENT NAME on 15th July, 2023 held by
          organization name
        </p>
      </div>

      <div className="flex flex-col items-center">
        <Image src={Signature} alt="signature" className="pr-8 w-60" />
        <div>
          <span className="border-t-2 border-black px-4 pt-4">
            Kuber Sing Adhikari
          </span>
          <span>Chairman</span>
        </div>
      </div>
    </div>
  );
};

export default CertificateA4;
