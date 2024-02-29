import { cn } from "@/lib/utils";
import React, { ComponentProps, ReactNode, forwardRef, memo } from "react";

type DottedLineBoxProps = ComponentProps<"div"> & {
  children: ReactNode;
};

const DottedLineBox = forwardRef<HTMLDivElement, DottedLineBoxProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-sm border border-transparent p-1 hover:border-dashed hover:border-gray-500",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DottedLineBox.displayName = "DottedLineBox";

export default memo(DottedLineBox);
