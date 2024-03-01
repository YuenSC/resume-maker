import { useSortable } from "@dnd-kit/sortable";
import { CSSProperties, ReactNode, memo } from "react";
import DottedLineBox from "./DottedLineBox";
import { cn } from "@/lib/utils";
import { CSS } from "@dnd-kit/utilities";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

type ReorderedListItemProps = {
  id: string;
  className?: string;
  children: (listeners: SyntheticListenerMap | undefined) => ReactNode;
  style?: CSSProperties;
};

const ReorderedListItem = ({
  id,
  className,
  children,
  style,
}: ReorderedListItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      className={className}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        ...style,
      }}
      {...attributes}
    >
      {children(listeners)}
    </div>
  );
};

export default memo(ReorderedListItem);
