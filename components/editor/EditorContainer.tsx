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
      <div className="fixed top-0 h-[50vh] w-full bg-gradient-to-b from-[#ffffff55] to-primary"></div>
      <div className={cn("relative h-full p-4", className)}>{children}</div>
    </EditorProvider>
  );
};

export default memo(EditorContainer);
