"use client";

import { memo } from "react";
import { useEditor } from "./editorContext";

const EditorDisplay = () => {
  const { editorRef } = useEditor();

  return (
    <div
      ref={editorRef}
      className="aspect-[210/297] w-[900px] self-center bg-white p-4"
    >
      Lorem ipsum dolor sit amet consectetur adipi
    </div>
  );
};

export default memo(EditorDisplay);
