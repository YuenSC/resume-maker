import { memo } from "react";
import { useEditor } from "../editorContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DottedLineBox from "@/components/DottedLineBox";
import { useFormContext } from "react-hook-form";
import { EditorResume } from "@/lib/types/editor/EditorResume";

const AboutMe = () => {
  const { register } = useFormContext<EditorResume>();
  const { sectionConfig } = useEditor();

  if (!sectionConfig.aboutMe) return null;

  return (
    <DottedLineBox>
      <Input placeholder="ABOUT ME" isTitle {...register("aboutMe.title")} />
      <Textarea
        placeholder="Enter your professional summary"
        {...register("aboutMe.value")}
      />
    </DottedLineBox>
  );
};

export default memo(AboutMe);
