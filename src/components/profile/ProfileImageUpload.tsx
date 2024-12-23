"use client";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
// import AvatarImg from "@/assets/Avatar.jpg";
import Image from "next/image";
import { CameraIcon } from "lucide-react";

type TImateUploadBtnProps = {
  setImage: any;
  className?: string;
};

const ProfileImageUpload: React.FC<TImateUploadBtnProps> = ({
  className,
  setImage,
}) => {
  const [imgUrl, setImgUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const AvatarImg = "/avatar.jpg";
  return (
    <div
      className={cn(
        "inline-block h-[100px] w-[100px] cursor-pointer  rounded-full",
        className
      )}
    >
      <div
        onClick={() => {
          inputRef.current?.click();
        }}
        className="absolute z-50 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-black text-white opacity-0 transition-opacity duration-300 hover:opacity-60"
      >
        <CameraIcon />
        <input
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              setImage(file);
              const fileUrl = URL.createObjectURL(file);
              setImgUrl(fileUrl);
            }
          }}
          type="file"
          accept="image/*"
          hidden
          ref={inputRef}
        />
      </div>
      <Image
        className="h-[100px] w-[100px] rounded-full border border-gray-200 object-cover"
        height={100}
        width={100}
        alt="placeholder"
        src={imgUrl ? imgUrl : AvatarImg}
      />
    </div>
  );
};

export default ProfileImageUpload;
