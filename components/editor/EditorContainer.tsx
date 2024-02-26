"use client";

import { cn } from "@/lib/utils";
import { ReactNode, memo } from "react";
import { EditorProvider } from "./editorContext";

type EditorContainerProps = {
  children: ReactNode;
  className?: string;
};

const EditorContainer = ({ children, className }: EditorContainerProps) => {
  return (
    <EditorProvider>
      <div
        className={cn(
          "min-h-screen bg-gradient-to-b from-primary-light to-primary p-4",
          className,
        )}
      >
        {children}
      </div>
    </EditorProvider>
  );
};

export default memo(EditorContainer);
