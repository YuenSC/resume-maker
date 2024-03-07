import { Input } from "@/components/ui/input";
import { memo } from "react";
import { useEditor } from "../editorContext";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useFormContext } from "react-hook-form";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { useTranslations } from "next-intl";
import ContentEditable from "@/components/ContentEditable";

const NameInput = () => {
  const { register } = useFormContext<EditorResume>();
  const { sectionConfig } = useEditor();
  const t = useTranslations("name");

  return (
    <div className="flex w-full flex-col">
      <Controller
        name="name"
        render={({ field }) => {
          return (
            <ContentEditable
              html={field.value}
              innerRef={field.ref}
              onChange={field.onChange}
              placeholder={t("your-name")}
              className="h-auto py-0 text-5xl font-semibold leading-[1.2] text-primary placeholder:text-primary"
            />
          );
        }}
      />

      {sectionConfig.role && (
        <Input
          placeholder={t("your-role")}
          className="px-2.5"
          {...register("role")}
        />
      )}
    </div>
  );
};

export default memo(NameInput);
