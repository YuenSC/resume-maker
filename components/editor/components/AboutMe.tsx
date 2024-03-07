import { memo } from "react";
import { useEditor } from "../editorContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DottedLineBox from "@/components/DottedLineBox";
import { Controller, useFormContext } from "react-hook-form";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { useTranslations } from "next-intl";
import ContentEditable from "@/components/ContentEditable";
import { cn } from "@/lib/utils";

const AboutMe = () => {
  const { register } = useFormContext<EditorResume>();
  const { sectionConfig } = useEditor();

  const t = useTranslations("editor");

  if (!sectionConfig.aboutMe) return null;

  return (
    <DottedLineBox className="flex w-full flex-col">
      <Input
        placeholder={t("about-me")}
        isTitle
        className="mb-2"
        {...register("aboutMe.title")}
      />

      <Controller
        name="aboutMe.value"
        render={({ field }) => {
          return (
            <ContentEditable
              html={field.value}
              innerRef={field.ref}
              onChange={field.onChange}
              placeholder={t("enter-your-professional-summary")}
            />
          );
        }}
      />
    </DottedLineBox>
  );
};

export default memo(AboutMe);
