import ContentEditable from "@/components/ContentEditable";
import DottedLineBox from "@/components/DottedLineBox";
import ReorderListControl from "@/components/ReorderListControl";
import ReorderedList from "@/components/ReorderedList";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { cn, generateRandomId } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { memo } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { useEditor } from "../editorContext";

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
          className="mb-2 px-2"
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
                  "group relative flex cursor-auto flex-col gap-2 bg-white pl-8",
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
                  <Textarea
                    placeholder={t("degree")}
                    className="h-6 py-0 text-base font-medium leading-5"
                    {...register(`education.records.${index}.degree`)}
                  />

                  <Controller
                    name={`education.records.${index}.duration`}
                    render={({ field }) => {
                      return (
                        <ContentEditable
                          html={field.value}
                          innerRef={field.ref}
                          onChange={field.onChange}
                          placeholder={t("from-until")}
                          className="h-auto self-start font-light"
                          noNewLine
                        />
                      );
                    }}
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
