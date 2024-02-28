import { Input } from "@/components/ui/input";
import { memo } from "react";
import { useEditor } from "../editorContext";
import DottedLineBox from "@/components/DottedLineBox";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { Button } from "@/components/ui/button";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { IoSwapVertical } from "react-icons/io5";
import { cn, generateRandomId } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const ExperienceReorderedList = () => {
  const {
    resume: { workExperiences },
    setResume,
    section,
  } = useEditor();

  const form = useForm<EditorResume["workExperiences"]>({
    defaultValues: workExperiences,
  });
  const { register, control } = form;
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "records",
  });

  if (!section.workExperience) return null;

  return (
    <FormProvider {...form}>
      <Input placeholder="Experience" isTitle {...register("title")} />
      {fields.map((record, index) => {
        return (
          <DottedLineBox
            key={record.id}
            className="group relative flex flex-col gap-1 pl-8"
          >
            <div className="absolute left-3 top-2.5 flex h-full flex-col items-center">
              <div className="z-10 h-2.5 w-2.5 rounded-full bg-primary" />
              {index !== fields.length - 1 && (
                <div className="z-0 h-[105%] w-0.5 scale-y-105 bg-gray-200" />
              )}
            </div>
            <div className="absolute right-0 top-0 mr-2 hidden -translate-y-1/2 group-hover:flex group-hover:gap-2">
              <Button
                size="icon"
                variant="secondary"
                onClick={() =>
                  append({
                    id: generateRandomId(),
                    description: "",
                    duration: "",
                    position: "",
                    title: "",
                  })
                }
              >
                <IoMdAdd size={16} />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                disabled={fields.length === 1}
                onClick={() => remove(index)}
              >
                <FiMinus size={16} />
              </Button>
              <Button size="icon" variant="secondary">
                <IoSwapVertical size={16} />
              </Button>
            </div>

            <Input
              autoFocus
              placeholder="Employer"
              isTitle
              className="text-primary placeholder:text-primary"
              {...register(`records.${index}.title`)}
            />

            <div className="flex">
              <Input
                placeholder="POSITION"
                isTitle
                className="flex-[4]"
                {...register(`records.${index}.position`)}
              />
              <Input
                className="flex-[1] font-light"
                placeholder="From - Until"
                {...register(`records.${index}.duration`)}
              />
            </div>

            <Controller
              name={`records.${index}.description`}
              control={control}
              render={({ field }) => {
                return (
                  <Textarea
                    {...field}
                    className="h-9"
                    placeholder="Enter your work experience description"
                  />
                );
              }}
            />
          </DottedLineBox>
        );
      })}
    </FormProvider>
  );
};

export default memo(ExperienceReorderedList);
