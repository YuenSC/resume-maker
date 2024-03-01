import * as React from "react";

import { cn } from "@/lib/utils";

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string,
) => {
  React.useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isTitle?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isTitle, ...props }, outerRef) => {
    const innerRef = React.useRef<React.ElementRef<"textarea">>(null);
    React.useImperativeHandle(outerRef, () => innerRef.current!, []);

    useAutosizeTextArea(innerRef.current, props?.value?.toString() || "");
    return (
      <textarea
        contentEditable
        className={cn(
          "flex w-full resize-none overflow-hidden rounded-sm bg-background p-2 text-sm placeholder:text-black hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          isTitle && "text-primary placeholder:text-primary",
          className,
        )}
        ref={innerRef}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
