import { Input } from "@/components/ui/input";
import { memo } from "react";
import { useEditor } from "../editorContext";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { useTranslations } from "next-intl";

const NameInput = () => {
  const { register } = useFormContext<EditorResume>();
  const { sectionConfig } = useEditor();
  const t = useTranslations("name");

  return (
    <div className="flex-1">
      <Textarea
        autoFocus
        placeholder={t("your-name")}
        className="text-6xl font-semibold text-primary"
        rows={1}
        {...register("name")}
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
