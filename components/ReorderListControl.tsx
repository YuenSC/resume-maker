import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { memo } from "react";
import { Button } from "./ui/button";
import { FiMinus } from "react-icons/fi";
import { IoSwapVertical } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

type ReorderControlProps = {
  canRemove: boolean;
  canReorder: boolean;
  onRemove: () => void;
  onAppend: () => void;
  reorderListeners: SyntheticListenerMap | undefined;
};

const ReorderListControl = ({
  canRemove,
  canReorder,
  onAppend,
  onRemove,
  reorderListeners,
}: ReorderControlProps) => {
  return (
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
          {...reorderListeners}
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
  );
};

export default memo(ReorderListControl);
