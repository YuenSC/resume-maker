import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isTitle?: boolean;
  autoWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, isTitle, autoWidth, value, placeholder, ...props },
    outerRef,
  ) => {
    const innerRef = React.useRef<React.ElementRef<"input">>(null);
    React.useImperativeHandle(outerRef, () => innerRef.current!, []);

    return (
      <span
        aria-placeholder={placeholder}
        contentEditable
        className={cn(
          "flex w-full items-center whitespace-nowrap rounded-sm bg-background px-1.5 text-base text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black hover:bg-gray-200 focus:bg-gray-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          `before:cursor-text before:content-none empty:before:content-[attr(aria-placeholder)]`,
          isTitle && "font-semibold text-black placeholder:text-black",
          className,
        )}
        ref={innerRef}
        {...props}
        onChange={() => {
          if (innerRef.current && !innerRef.current.innerHTML) {
            innerRef.current.innerHTML = placeholder || "";
          }
        }}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
