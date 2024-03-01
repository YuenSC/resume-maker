import { useSortable } from "@dnd-kit/sortable";
import { ReactNode, memo } from "react";
import DottedLineBox from "./DottedLineBox";
import { cn } from "@/lib/utils";
import { CSS } from "@dnd-kit/utilities";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

type ReorderedListItemProps = {
  id: string;
  children: (listeners: SyntheticListenerMap | undefined) => ReactNode;
};

const ReorderedListItem = ({ id, children }: ReorderedListItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
    >
      {children(listeners)}
    </div>
  );
};

export default memo(ReorderedListItem);
