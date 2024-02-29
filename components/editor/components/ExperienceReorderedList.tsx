import DottedLineBox from "@/components/DottedLineBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { cn, generateRandomId } from "@/lib/utils";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo, useState } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { IoSwapVertical } from "react-icons/io5";
import { useEditor } from "../editorContext";

const Experience = ({
  onRemove,
  onAppend,
  index,
  isLast,
  canRemove,
  canReorder,
  id,
  isActive,
}: {
  onRemove: () => void;
  onAppend: () => void;
  index: number;
  isLast: boolean;
  canRemove: boolean;
  canReorder: boolean;
  id: string;
  isActive?: boolean;
}) => {
  const { register, control } = useFormContext();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  console.log({
    id,
    transform: CSS.Transform.toString(transform),
  });
  return (
    <DottedLineBox
      key={index}
      ref={setNodeRef}
      className={cn(
        "group relative flex cursor-auto flex-col gap-1 bg-white pl-8",
        isActive && "z-20 shadow-xl",
      )}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
    >
      <div className="absolute left-3 top-2.5 flex h-full flex-col items-center">
        <div className="z-20 h-2.5 w-2.5 rounded-full bg-primary" />
        {!isActive && isLast && (
          <div className="z-10 h-[105%] w-0.5 scale-y-105 bg-gray-200" />
        )}
      </div>
      <div className="absolute right-0 top-0 mr-2 hidden -translate-y-1/2 group-hover:flex group-hover:gap-2">
        {canRemove && (
          <Button
            size="icon"
            variant="secondary"
            className="text-white"
            onClick={onRemove}
          >
            <FiMinus size={16} />
          </Button>
        )}
        {canReorder && (
          <Button
            size="icon"
            variant="secondary"
            className="text-white"
            {...listeners}
          >
            <IoSwapVertical size={16} />
          </Button>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="text-white"
          onClick={onAppend}
        >
          <IoMdAdd size={16} />
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
          {...register(`records.${index}.position`)}
        />
        <Controller
          name={`records.${index}.duration`}
          render={({ field }) => (
            <Input
              contentEditable
              className="flex w-fit p-0 font-light"
              placeholder="From - Until"
              {...field}
              // {...register(`records.${index}.duration`)}
            />
          )}
        />
      </div>

      <Controller
        name={`records.${index}.description`}
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
};

const ExperienceReorderedList = () => {
  const {
    resume: { workExperiences },
    setResume,
    section,
  } = useEditor();

  const [activeId, setActiveId] = useState("");

  const form = useForm<EditorResume["workExperiences"]>({
    defaultValues: workExperiences,
  });
  const { register, control, setValue } = form;
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "records",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  if (!section.workExperience) return null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event) => setActiveId(event.active.id as string)}
      onDragEnd={(event) => {
        console.log("onDragEnd");
        setActiveId("");
        const { active, over } = event;
        if (over && active.id !== over.id) {
          const oldIndex = fields.findIndex((item) => item.id === active.id);
          const newIndex = fields.findIndex((item) => item.id === over.id);
          setValue("records", arrayMove(fields, oldIndex, newIndex));
        }
      }}
    >
      <FormProvider {...form}>
        <Input placeholder="Experience" isTitle {...register("title")} />
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          {fields.map((record, index) => {
            return (
              <Experience
                id={record.id}
                key={record.id}
                index={index}
                isActive={record.id === activeId}
                canRemove={fields.length > 1}
                canReorder={fields.length > 1}
                isLast={index !== fields.length - 1}
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
              />
            );
          })}
        </SortableContext>
      </FormProvider>
    </DndContext>
  );
};

export default memo(ExperienceReorderedList);
