"use client";

import { memo, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "../ui/button";
import { useEditor } from "./editorContext";

const EditorDisplay = () => {
  const { editorRef } = useEditor();

  return (
    <div
      ref={editorRef}
      className="mt-20 aspect-[210/297] w-[800px] self-center bg-white p-4"
    >
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis
      deserunt quos corrupti eius itaque assumenda labore molestias, voluptatem
      voluptatum quod provident animi fugit aliquam earum at impedit optio aut?
      Culpa.
    </div>
  );
};

export default memo(EditorDisplay);
