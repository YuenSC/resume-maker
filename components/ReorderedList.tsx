import { cn } from "@/lib/utils";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { ReactNode, memo, useState } from "react";
import ReorderedListItem from "./ReorderedListItem";

type ReorderedListProps<T extends { id: string }> = {
  items: T[];
  onReorder: (oldIndex: number, newIndex: number) => void;
  render: (
    props: { item: T; index: number; isActive: boolean },
    listeners: SyntheticListenerMap | undefined,
  ) => ReactNode;
  type?: "grid" | "list";
};

const ReorderedList = <T extends { id: string }>({
  items,
  onReorder,
  render,
  type = "list",
}: ReorderedListProps<T>) => {
  const [activeId, setActiveId] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event) => setActiveId(event.active.id as string)}
      onDragEnd={(event) => {
        setActiveId("");
        const { active, over } = event;
        if (over && active.id !== over.id) {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          onReorder(oldIndex, newIndex);
        }
      }}
    >
      <SortableContext items={items}>
        <div className={cn(type === "grid" && "grid grid-cols-3 gap-2")}>
          {items.map((item, index) => {
            const isActive = item.id === activeId;

            return (
              <ReorderedListItem
                key={item.id}
                id={item.id}
                className={cn("relative", isActive && "z-10 bg-red-200")}
              >
                {(listeners) => render({ item, index, isActive }, listeners)}
              </ReorderedListItem>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default memo(ReorderedList) as typeof ReorderedList;
