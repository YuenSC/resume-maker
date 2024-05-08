import ContentEditable from "@/components/ContentEditable";
import DottedLineBox from "@/components/DottedLineBox";
import { Input } from "@/components/ui/input";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { Controller, FieldPath, useFormContext } from "react-hook-form";
import { useEditor } from "../editorContext";
import { EditorSectionConfig } from "@/lib/types/editor/EditorSectionConfig";

type TextSectionProps = {
  titlePlaceholder: string;
  valuePlaceholder: string;
  valueFieldName: FieldPath<EditorResume>;
  titleFieldName: FieldPath<EditorResume>;
  sectionConfigKey: keyof EditorSectionConfig;
};

const TextSection = ({
  valuePlaceholder,
  titlePlaceholder,
  titleFieldName,
  valueFieldName,
  sectionConfigKey,
}: TextSectionProps) => {
  const { register } = useFormContext<EditorResume>();
  const { sectionConfig } = useEditor();

  const t = useTranslations("editor");

  if (!sectionConfig[sectionConfigKey]) return null;

  return (
    <DottedLineBox className="flex w-full flex-col">
      <Input
        placeholder={titlePlaceholder}
        isTitle
        className="mb-2"
        {...register(titleFieldName)}
      />

      <Controller
        name={valueFieldName}
        render={({ field }) => {
          return (
            <ContentEditable
              html={field.value}
              innerRef={field.ref}
              onChange={field.onChange}
              placeholder={valuePlaceholder}
            />
          );
        }}
      />
    </DottedLineBox>
  );
};

export default memo(TextSection);
