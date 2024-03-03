import DottedLineBox from "@/components/DottedLineBox";
import ReorderListControl from "@/components/ReorderListControl";
import ReorderedList from "@/components/ReorderedList";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { cn, generateRandomId } from "@/lib/utils";
import { memo } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { useEditor } from "../editorContext";

const ExperienceReorderedList = () => {
  const { sectionConfig } = useEditor();

  const form = useFormContext<EditorResume>();
  const { register, control } = form;
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "workExperiences.records",
  });

  if (!sectionConfig.workExperience) return null;

  return (
    <FormProvider {...form}>
      <div>
        <Input
          placeholder="EXPERIENCE"
          isTitle
          {...register("workExperiences.title")}
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
                  isActive && "shadow-xl",
                )}
              >
                <div className="absolute left-3 top-2.5 flex h-full flex-col items-center">
                  <div className="z-20 h-2.5 w-2.5 rounded-full bg-primary" />
                  {!isActive && !isLast && (
                    <div className="z-10 h-[105%] w-0.5 scale-y-105 bg-gray-100" />
                  )}
                </div>

                <ReorderListControl
                  canRemove={fields.length > 1}
                  canReorder={fields.length > 1}
                  onRemove={() => remove(index)}
                  onAppend={() =>
                    append({
                      id: generateRandomId(),
                      description: "",
                      duration: "",
                      position: "",
                      title: "",
                    })
                  }
                  reorderListeners={listeners}
                />

                <Input
                  autoFocus
                  placeholder="Employer"
                  isTitle
                  className="text-primary placeholder:text-primary"
                  {...register(`workExperiences.records.${index}.title`)}
                />
                <div className="flex">
                  <Input
                    placeholder="POSITION"
                    className="font-medium"
                    isTitle
                    {...register(`workExperiences.records.${index}.position`)}
                  />
                  <Controller
                    name={`records.${index}.duration`}
                    render={({ field }) => (
                      <Input
                        contentEditable
                        className="flex w-fit font-light"
                        placeholder="From - Until"
                        {...field}
                      />
                    )}
                  />
                </div>
                <Controller
                  name={`workExperiences.records.${index}.description`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Textarea
                        {...field}
                        className="h-6 py-0 text-base"
                        placeholder="Enter your work experience description"
                      />
                    );
                  }}
                />
              </DottedLineBox>
            );
          }}
        />
      </div>
    </FormProvider>
  );
};

export default memo(ExperienceReorderedList);
