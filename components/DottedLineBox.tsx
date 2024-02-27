import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode, memo } from "react";

type DottedLineBoxProps = ComponentProps<"div"> & {
  children: ReactNode;
};

const DottedLineBox = ({
  children,
  className,
  ...props
}: DottedLineBoxProps) => {
  return (
    <div
      className={cn(
        "rounded-sm border border-transparent p-1 hover:border-dashed hover:border-gray-500",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default memo(DottedLineBox);
