import { cn } from "@/lib/utils";
import { memo } from "react";
import ReactContentEditable, {
  Props as ReactContentEditableProps,
} from "react-contenteditable";

const ContentEditable = ({
  className,
  placeholder,
  ref,
  onChange,
  ...props
}: Omit<ReactContentEditableProps, "onChange"> & {
  placeholder: string;
  onChange: (text: string) => void;
}) => {
  return (
    <ReactContentEditable
      {...props}
      onChange={(event) => {
        onChange(
          ["<div><br></div>", "<br>"].includes(event.target.value)
            ? ""
            : event.target.value,
        );
      }}
      aria-placeholder={placeholder}
      className={cn(
        "rounded-sm bg-background p-1.5 text-base leading-5 text-black placeholder:text-black hover:bg-gray-100 focus:bg-gray-100 focus-visible:outline-none",
        `before:cursor-text before:content-none empty:before:content-[attr(aria-placeholder)]`,
        className,
      )}
    />
  );
};

ContentEditable.displayName = "ContentEditable";

export default memo(ContentEditable);
