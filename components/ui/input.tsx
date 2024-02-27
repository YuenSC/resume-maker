import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isTitle?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isTitle, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "text-md flex w-full rounded-sm bg-background px-2 text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black hover:bg-gray-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          isTitle && "font-semibold text-black placeholder:text-black",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
