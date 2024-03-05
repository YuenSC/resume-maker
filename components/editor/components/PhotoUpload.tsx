import { useToast } from "@/components/ui/use-toast";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { cn } from "@/lib/utils";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { memo, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useController } from "react-hook-form";
import { useEditor } from "../editorContext";
import { useTranslations } from "next-intl";

const toBase64: (file: File) => Promise<string> = (file) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      typeof reader.result === "string"
        ? resolve(reader.result)
        : reject("Onload result is not a string");
    reader.onerror = reject;
  });

const PhotoUpload = () => {
  const { toast } = useToast();

  const t = useTranslations("photo");

  const { sectionConfig } = useEditor();
  const {
    field: { value: photo, onChange },
  } = useController<EditorResume, "photo">({
    name: "photo",
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const imageFile = acceptedFiles[0];
      if (!imageFile) {
        toast({
          title: t("no-profile-image-uploaded"),
          variant: "destructive",
        });
        return;
      }

      try {
        const base64 = await toBase64(imageFile);
        onChange(base64);
      } catch (error) {
        console.log("error", error);
        toast({
          title: t("no-profile-image-uploaded"),
          description: error as string,
          variant: "destructive",
        });
      }
    },
    [onChange, t, toast],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/webp": [".webp"],
    },
  });

  if (!sectionConfig.photo) return null;

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div
        className={cn(
          "relative flex aspect-square w-[225px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full bg-gray-400 text-white",
          isDragActive && "border-2 border-primary",
        )}
      >
        {photo ? (
          <Image src={photo} fill alt="User Profile Image" objectFit="cover" />
        ) : (
          <>
            <UploadIcon />
            <p className="text-sm">{t("upload-your-photo")}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(PhotoUpload);
