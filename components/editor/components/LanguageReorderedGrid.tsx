import DottedLineBox from "@/components/DottedLineBox";
import ReorderListControl from "@/components/ReorderListControl";
import ReorderedList from "@/components/ReorderedList";
import { Input } from "@/components/ui/input";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { useEditor } from "../editorContext";
import { useTranslations } from "next-intl";

const LanguageReorderedGrid = () => {
  const { sectionConfig } = useEditor();

  const { register, control } = useFormContext<EditorResume>();
  const { append, move, fields, remove } = useFieldArray({
    control,
    name: "languages.records",
  });

  const t = useTranslations("language");

  if (!sectionConfig.skills) return null;

  return (
    <DottedLineBox className="flex flex-col gap-2">
      <Input
        placeholder={t("title")}
        isTitle
        {...register("languages.title")}
      />

      <ReorderedList
        type="grid"
        items={fields}
        onReorder={(oldIndex, newIndex) => move(oldIndex, newIndex)}
        render={({ index, isActive }, listeners) => {
          return (
            <div
              className={cn(
                "group relative flex cursor-auto flex-col gap-1 bg-white",
                isActive && "shadow-xl",
              )}
            >
              <ReorderListControl
                canRemove={fields.length > 1}
                canReorder={fields.length > 1}
                onRemove={() => remove(index)}
                onAppend={() => append({ title: "" })}
                reorderListeners={listeners}
              />
              <Input
                placeholder={t("enter-your-language")}
                className="bg-gray-100 px-2 py-1 text-sm"
                {...register(`languages.records.${index}.title`)}
              />
            </div>
          );
        }}
      />
    </DottedLineBox>
  );
};

export default memo(LanguageReorderedGrid);
