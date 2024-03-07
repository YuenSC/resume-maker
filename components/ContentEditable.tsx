import { cn } from "@/lib/utils";
import { memo } from "react";
// eslint-disable-next-line no-restricted-imports
import ReactContentEditable, {
  Props as ReactContentEditableProps,
} from "react-contenteditable";

const ContentEditable = ({
  className,
  placeholder,
  ref,
  onChange,
  noNewLine,
  html = "",
  ...props
}: Omit<ReactContentEditableProps, "onChange"> & {
  placeholder: string;
  onChange: (text: string) => void;
  noNewLine?: boolean;
}) => {
  return (
    <ReactContentEditable
      spellCheck={true}
      {...props}
      html={html}
      onChange={(event) => {
        onChange(
          ["<div><br></div>", "<br>"].includes(event.target.value)
            ? ""
            : event.target.value,
        );
      }}
      onKeyDown={(e) => {
        if (noNewLine && e.key === "Enter") {
          e.preventDefault();
        }
      }}
      aria-placeholder={placeholder}
      className={cn(
        "rounded-sm bg-background px-1.5 text-base leading-6 text-black placeholder:text-black hover:bg-gray-100 focus:bg-gray-100 focus-visible:outline-none",
        placeholder &&
          `before:cursor-text before:content-none empty:before:content-[attr(aria-placeholder)]`,
        noNewLine && "whitespace-nowrap",
        className,
      )}
    />
  );
};

ContentEditable.displayName = "ContentEditable";

export default memo(ContentEditable);
