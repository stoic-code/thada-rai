"use client";
import * as htmlToImage from "html-to-image";
const Placeholder = "................";
import React, { useRef } from "react";
import { Card } from "@/components/ui/card";

import { Tiro_Devanagari_Hindi } from "next/font/google";
import { Button } from "@/components/ui/button";
import { DownloadCloud, Globe, Mail, Phone } from "lucide-react";
import { engNumToNepNum } from "@/lib/date";
const tiro = Tiro_Devanagari_Hindi({
  weight: ["400"],
  subsets: ["devanagari"],
});

const IdentityCard = ({ values }: { values: any }) => {
  const fields = [
    // {
    //   title: "लिङ्ग",
    //   field: values.gender,
    // },
    // {
    //   title: "प्रदेश",
    //   field: values.province,
    // },
    // {
    //   title: "जिल्ला",
    //   field: values.district,
    // },
    // {
    //   title: "नगरपालिका",
    //   field: values.local,
    // },
    // {
    //   title: "वार्ड नं",
    //   field: values.ward,
    // },
    {
      title: "जन्म स्थान",
      field: values.birthPlace,
    },
    {
      title: "जन्म मिति",
      field: values.dob,
    },
    {
      title: "रक्त समूह",
      field: values.bloodGroup,
    },
    {
      title: "सम्पर्क नं",
      field: values.phone,
    },
    {
      title: "हालको ठेगाना",
      field: `${values.local}-${values.ward}, ${values.district}`,
    },
    {
      title: "मुख्य पेशा",
      field: values.profession,
    },

    {
      title: "पुस्ता नं",
      field: "N/A",
    },
  ];

  // TO download idcard
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // Check if cardRef has current value
    if (cardRef.current) {
      // Use html-to-image library to convert the HTML element to an image
      htmlToImage
        .toPng(cardRef.current)
        .then(function(dataUrl) {
          // Create a temporary link element
          const link = document.createElement("a");
          link.download = "identity-card.png"; // Set the download file name
          link.href = dataUrl; // Set the href attribute to the data URL
          // Trigger the download process
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(function(error) {
          console.error("Error while downloading:", error);
        });
    }
  };
  return (
    <Card className={`${tiro.className} border-none py-10 shadow-none`}>
      <div className="overflow-auto">
        <div
          ref={cardRef}
          className="relative flex h-[6in] w-[3in] flex-col overflow-hidden rounded-xl border bg-white"
          style={{
            background:
              "url(/idback.svg) center -18% no-repeat, url(/idbackbottom.svg) center 100% no-repeat, white",
          }}
        >
          {/* 
          <img
            src="/idback.svg"
            alt="CardBack"
            className="absolute -top-14 z-0 w-full rounded-t-xl"
          /> */}

          <div className="relative items-center gap-4">
            <img
              src="/logo.png"
              alt="logo"
              className="absolute top-3 mx-4 h-12 w-12 rounded-full"
            />
            <div className="py-3 pl-4 text-center text-white">
              <div>
                <div className="font-semibold">गोदार थापा सेवा समाज</div>
                <div className="text-sm">
                  केन्द्रिय कार्यालय, उर्लाबारी, मोरंग
                </div>
              </div>
            </div>
          </div>

          <span
            style={{ lineHeight: "1rem" }}
            className="mx-auto flex w-fit items-center justify-center rounded-3xl bg-white px-4 pt-1 text-sm font-bold text-primary"
          >
            परिचय-पत्र
          </span>

          <div className="mt-2 flex items-start justify-between px-6">
            <div className="flex flex-col text-sm text-white">
              <span>सदस्यता नं.</span>
              <span>{engNumToNepNum(values.membershipNo)}</span>
            </div>
            <img
              src={values.image}
              alt="Profile Image"
              className="h-24 w-24 rounded-full bg-cover object-cover object-center"
            />
            <div className="flex flex-col text-sm text-white">
              <span>जारी मिति</span>
              <span>{values.updatedAt}</span>
            </div>
          </div>

          <div className="bg-white pt-4 text-center text-primary">
            <div
              className="text-xl font-semibold"
              style={{ lineHeight: "1rem" }}
            >
              {values.fullName ? values.fullName : Placeholder}
            </div>
            <div>{values.designation ? values.designation : Placeholder}</div>

            <div className={`flex flex-col text-black`}>
              {fields.map((f, idx) => (
                <div
                  key={idx}
                  className="grid h-full grid-cols-2 gap-2 text-[0.9rem]"
                >
                  <span className="text-right font-medium">{f.title} :</span>
                  <span className="text-left">
                    {f.field ? f.field : Placeholder}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-16 flex w-full items-center justify-between px-8">
            <img src="/qr.webp" width={50} height={50} alt="QR Image" />
            <div className="relative self-end">
              <img
                src="/idcard/signature.svg"
                alt="SignatureImage"
                width={250}
                height={250}
                className="absolute -left-6 -top-12"
              />
              <span className="block w-full border-t text-center text-sm">
                कुबेर सिंह थापा गोदार
                <br />
                अध्यक्ष
              </span>
            </div>
          </div>

          <div className="absolute bottom-1 flex w-full justify-between px-4 text-[0.8rem] text-white">
            <div className="flex flex-col gap-1">
              <span>
                <Phone size={14} className="inline" /> 01-555555
              </span>
              <span>
                <Mail size={14} className="inline" /> test@gmail.com
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span>
                <Phone size={14} className="inline" /> 98xxxxxxxx
              </span>
              <span>
                <Globe size={14} className="inline" /> example.com.np
              </span>
            </div>
          </div>
        </div>
      </div>

      {values.status !== "pending" && (
        <div className="my-4">
          <Button
            onClick={handleDownload}
            disabled={values.status !== "approved"}
            className="flex gap-2 "
          >
            <DownloadCloud size={20} /> Download
          </Button>
        </div>
      )}
    </Card>
  );
};

export default IdentityCard;
