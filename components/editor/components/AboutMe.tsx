import { memo } from "react";
import { useEditor } from "../editorContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DottedLineBox from "@/components/DottedLineBox";
import { useFormContext } from "react-hook-form";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { useTranslations } from "next-intl";

const AboutMe = () => {
  const { register } = useFormContext<EditorResume>();
  const { sectionConfig } = useEditor();

  const t = useTranslations("editor");

  if (!sectionConfig.aboutMe) return null;

  return (
    <DottedLineBox>
      <Input
        placeholder={t("about-me")}
        isTitle
        {...register("aboutMe.title")}
      />
      <Textarea
        placeholder={t("enter-your-professional-summary")}
        {...register("aboutMe.value")}
      />
    </DottedLineBox>
  );
};

export default memo(AboutMe);
