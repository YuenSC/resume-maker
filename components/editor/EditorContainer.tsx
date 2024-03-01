"use client";

import { cn } from "@/lib/utils";
import { ReactNode, memo } from "react";
import { EditorProvider, useEditor } from "./editorContext";
import { AvailableFonts } from "@/lib/fonts";

type EditorContainerProps = {
  children: ReactNode;
  className?: string;
};

const EditorContainer = ({ children, className }: EditorContainerProps) => {
  return (
    <EditorProvider>
      <div className="fixed top-0 h-[50vh] w-full bg-gradient-to-b from-white/50 to-primary"></div>
      <div className={cn("relative flex w-full flex-col gap-4 p-4", className)}>
        {children}
      </div>
    </EditorProvider>
  );
};

export default memo(EditorContainer);
