import DottedLineBox from "@/components/DottedLineBox";
import ReorderListControl from "@/components/ReorderListControl";
import ReorderedList from "@/components/ReorderedList";
import { Input } from "@/components/ui/input";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { cn, generateRandomId } from "@/lib/utils";
import { memo } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useEditor } from "../editorContext";

const EducationReorderedList = () => {
  const {
    resume: { education },
    setResume,
    sectionConfig,
  } = useEditor();

  const form = useForm<EditorResume["education"]>({
    defaultValues: education,
  });
  const { register, control, setValue } = form;
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "records",
  });

  if (!sectionConfig.education) return null;

  return (
    <FormProvider {...form}>
      <div>
        <Input
          placeholder="EDUCATION"
          className="px-2"
          isTitle
          {...register("title")}
        />
        <ReorderedList
          items={fields}
          onReorder={(oldIndex, newIndex) => move(oldIndex, newIndex)}
          render={({ index, isActive }, listeners) => {
            const isLast = index === fields.length - 1;

            return (
              <DottedLineBox
                className={cn(
                  "group relative flex cursor-auto flex-col gap-1 bg-white pl-8",
                  isActive && "z-20 shadow-xl",
                )}
              >
                <div className="absolute left-3 top-2.5 flex h-full flex-col items-center">
                  <div className="z-20 h-2.5 w-2.5 rounded-full bg-primary" />
                  {!isActive && !isLast && (
                    <div className="absolute top-2 z-10 h-[100%] w-0.5 scale-y-105 bg-gray-100" />
                  )}
                </div>
                <ReorderListControl
                  canRemove={fields.length > 1}
                  canReorder={fields.length > 1}
                  onRemove={() => remove(index)}
                  onAppend={() =>
                    append({
                      id: generateRandomId(),
                      school: "",
                      duration: "",
                      degree: "",
                    })
                  }
                  reorderListeners={listeners}
                />

                <Input
                  autoFocus
                  placeholder="School"
                  isTitle
                  className="text-primary placeholder:text-primary"
                  {...register(`records.${index}.school`)}
                />
                <div className="flex">
                  <Input
                    placeholder="DEGREE"
                    className="font-medium"
                    isTitle
                    {...register(`records.${index}.degree`)}
                  />
                  <Input
                    placeholder="From - Until"
                    isTitle
                    className="flex w-fit font-light"
                    {...register(`records.${index}.duration`)}
                  />
                </div>
              </DottedLineBox>
            );
          }}
        />
      </div>
    </FormProvider>
  );
};

export default memo(EducationReorderedList);
