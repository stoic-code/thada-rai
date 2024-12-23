import { PixelCrop } from "react-image-crop";

export const getCroppedImg = async (
  image: HTMLImageElement,
  crop: PixelCrop,
  fileName: string,
  quality: number = 1, // default quality setting
): Promise<File | null> => {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], fileName, { type: "image/jpeg" });
          resolve(file);
        } else {
          resolve(null);
        }
      },
      "image/jpeg",
      quality,
    ); // quality parameter
  });
};

/** Resize image before using it in the cropper */
export const resizeImage = async (
  file: File,
  maxWidth: number,
  maxHeight: number,
): Promise<File | null> => {
  return new Promise((resolve) => {
    const img = document.createElement("img");
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return null;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height *= maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width *= maxHeight / height));
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: "image/jpeg",
              });
              resolve(resizedFile);
            } else {
              resolve(null);
            }
          },
          "image/jpeg",
          0.9,
        );
      };
    };

    reader.readAsDataURL(file);
  });
};
