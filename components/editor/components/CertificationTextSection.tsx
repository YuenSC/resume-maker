import ContentEditable from "@/components/ContentEditable";
import DottedLineBox from "@/components/DottedLineBox";
import { Input } from "@/components/ui/input";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useEditor } from "../editorContext";

const CertificationTextSection = () => {
  const { register } = useFormContext<EditorResume>();
  const { sectionConfig } = useEditor();

  const t = useTranslations("certification");

  if (!sectionConfig.aboutMe) return null;

  return (
    <DottedLineBox className="flex w-full flex-col">
      <Input
        placeholder={t("certification")}
        isTitle
        className="mb-2"
        {...register("certification.title")}
      />

      <Controller
        name="certification.value"
        render={({ field }) => {
          return (
            <ContentEditable
              html={field.value}
              innerRef={field.ref}
              onChange={field.onChange}
              placeholder={t("enter-your-certification")}
            />
          );
        }}
      />
    </DottedLineBox>
  );
};

export default memo(CertificationTextSection);
