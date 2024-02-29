import { useSortable } from "@dnd-kit/sortable";
import { ReactNode, memo } from "react";
import DottedLineBox from "./DottedLineBox";
import { cn } from "@/lib/utils";
import { CSS } from "@dnd-kit/utilities";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

type ReorderedListItemProps = {
  id: string;
  isActive?: boolean;
  children: (listeners: SyntheticListenerMap | undefined) => ReactNode;
};

const ReorderedListItem = ({
  id,
  isActive,
  children,
}: ReorderedListItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <DottedLineBox
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
      {children(listeners)}
    </DottedLineBox>
  );
};

export default memo(ReorderedListItem);
