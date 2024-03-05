import DottedLineBox from "@/components/DottedLineBox";
import ReorderListControl from "@/components/ReorderListControl";
import ReorderedList from "@/components/ReorderedList";
import { Input } from "@/components/ui/input";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { cn, generateRandomId } from "@/lib/utils";
import { memo } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useEditor } from "../editorContext";
import { useTranslations } from "next-intl";

const EducationReorderedList = () => {
  const { sectionConfig } = useEditor();

  const form = useFormContext<EditorResume>();
  const { register, control, setValue } = form;
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "education.records",
  });

  const t = useTranslations("education");

  if (!sectionConfig.education) return null;

  return (
    <FormProvider {...form}>
      <div>
        <Input
          placeholder={t("title")}
          className="px-2"
          isTitle
          {...register("education.title")}
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
                  placeholder={t("school")}
                  isTitle
                  className="text-primary placeholder:text-primary"
                  {...register(`education.records.${index}.school`)}
                />
                <div className="flex">
                  <Input
                    placeholder={t("degree")}
                    className="font-medium"
                    isTitle
                    {...register(`education.records.${index}.degree`)}
                  />
                  <Input
                    placeholder={t("from-until")}
                    isTitle
                    className="flex w-fit font-light"
                    {...register(`education.records.${index}.duration`)}
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
