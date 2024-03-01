"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { ReactNode, memo, useEffect, useState } from "react";
import { EditorProvider } from "./editorContext";
import Link from "next/link";

type EditorContainerProps = {
  children: ReactNode;
  className?: string;
};

const EditorContainer = ({ children, className }: EditorContainerProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <EditorProvider>
      <AlertDialog open={open}>
        <AlertDialogContent onEscapeKeyDown={() => setOpen(false)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Warning</AlertDialogTitle>
            <AlertDialogDescription>
              Please note that this website is recreated based on
              <Link
                target="_blank"
                href="https://www.resumemaker.online/editor"
                className="mx-1 text-primary underline"
              >
                https://www.resumemaker.online/editor
              </Link>
              . You may find better experience from there.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpen(false)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="fixed top-0 h-[50vh] w-full bg-gradient-to-b from-white/50 to-primary"></div>
      <div className={cn("relative flex w-full flex-col gap-4 p-4", className)}>
        {children}
      </div>
    </EditorProvider>
  );
};

export default memo(EditorContainer);
