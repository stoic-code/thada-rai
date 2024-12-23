"use client";
import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CameraIcon, Images } from "lucide-react";
import { useDropzone } from "react-dropzone";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type TImageUploadBtnProps = {
  setValue: any;
  trigger: any;
  className?: string;
  url?: string;
  name: string;
};

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { MAX_FILE_SIZE } from "@/schema/constants";
import { getCroppedImg, resizeImage } from "@/lib/image";
import { Button } from "./ui/button";

export const ImageUploadBtn2 = ({
  setValue,
  trigger,
  className,
  name,
  url,
}: TImageUploadBtnProps) => {
  const [imgUrl, setImgUrl] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const resizedFile = await resizeImage(acceptedFiles[0], 1000, 1000); // Resize to a max width/height of 1000px
    setFile(resizedFile);
    setValue("image", acceptedFiles[0]);
    setImgUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
  });

  const onCropComplete = useCallback(
    async (crop: PixelCrop) => {
      if (imageRef.current && crop.width && crop.height && file) {
        const croppedImgFile = await getCroppedImg(
          imageRef.current,
          crop,
          file.name,
        );
        if (croppedImgFile) {
          const croppedImgUrl = URL.createObjectURL(croppedImgFile);
          setImgUrl(croppedImgUrl);
          setValue(name, croppedImgFile);
          trigger(name);
        }
      }
    },
    [setValue, trigger, file],
  );

  function onImageLoad(e: any) {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

    const crop = centerCrop(
      makeAspectCrop(
        {
          // You don't need to pass a complete crop into
          // makeAspectCrop or centerCrop.
          unit: "%",
          width: 90,
        },
        1 / 1,
        width,
        height,
      ),
      width,
      height,
    );

    setCrop(crop);
  }

  return (
    <>
      <div
        className={cn(
          "inline-block h-[100px] w-[100px] cursor-pointer rounded-full",
          className,
        )}
      >
        <div
          onClick={() => setOpen(true)}
          className="absolute flex h-[100px] w-[100px] items-center justify-center rounded-full bg-black text-white opacity-0 transition-opacity duration-300 hover:opacity-60"
        >
          <CameraIcon />
        </div>
        <Image
          className="h-[100px] w-[100px] rounded-full border border-gray-200 object-cover"
          height={100}
          width={100}
          alt="placeholder"
          src={imgUrl || url || "/avatar.jpg"}
        />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Photo</DialogTitle>
            <DialogDescription>
              You can crop image for better view in tree.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center min-h-[200px] sm:h-[300px]">
            {!file ? (
              <div
                {...getRootProps()}
                className="flex text-sm gap-2 h-full w-full cursor-pointer flex-col items-center justify-center text-muted-foreground outline-none border border-dashed border-primary rounded-md"
              >
                <input
                  {...getInputProps()}
                  className="w-full outline-none border-dashed"
                />
                <Images size={50} />
                <p>Drag and Drop Image Here</p>
                <p>or</p>
                <p>Click Here</p>
                <p>To upload image</p>
              </div>
            ) : (
              <div>
                <ReactCrop
                  style={{ objectFit: "contain" }}
                  crop={crop}
                  onChange={(newCrop) => setCrop(newCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  //@ts-ignore
                  onLoad={onImageLoad}
                  aspect={1}
                >
                  <img
                    ref={imageRef}
                    src={URL.createObjectURL(file)}
                    alt="Crop"
                    className="w-full h-full object-contain min-h-[200px] sm:h-[300px]"
                  />
                </ReactCrop>
              </div>
            )}
          </div>

          <DialogFooter className="p-0">
            <Button
              onClick={() => {
                setFile(null);
                setCrop(undefined);
                setValue("image", undefined);
                setImgUrl("");
              }}
              type="button"
              variant="destructive"
              className="flex gap-2"
            >
              Change Image
            </Button>

            <Button
              type="button"
              onClick={() => {
                completedCrop && onCropComplete(completedCrop);
                setOpen(false);
              }}
              disabled={!crop}
            >
              {crop ? "Crop & Save" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
