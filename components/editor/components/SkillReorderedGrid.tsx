import DottedLineBox from "@/components/DottedLineBox";
import ReorderListControl from "@/components/ReorderListControl";
import ReorderedList from "@/components/ReorderedList";
import { Input } from "@/components/ui/input";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useEditor } from "../editorContext";

const SkillReorderedGrid = () => {
  const { resume, section } = useEditor();

  const { register, control } = useForm<EditorResume["skills"]>({
    defaultValues: resume.skills,
  });
  const { append, move, fields, remove } = useFieldArray({
    control,
    name: "records",
  });

  if (!section.skills) return null;

  return (
    <DottedLineBox className="flex flex-col gap-2">
      <Input placeholder="SKILLS" isTitle {...register("title")} />

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
                placeholder="Enter your skill"
                className="bg-gray-100 px-2 py-1 text-sm"
                {...register(`records.${index}.title`)}
              />
            </div>
          );
        }}
      />
    </DottedLineBox>
  );
};

export default memo(SkillReorderedGrid);
