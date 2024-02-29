"use client";

import { memo } from "react";
import { Button } from "../ui/button";
import { useEditor } from "./editorContext";

const EditorNavBar = () => {
  const { handlePrint } = useEditor();

  return (
    <div className="fixed z-50 flex w-[calc(100%-2rem)] items-center justify-between rounded-xl bg-black px-4 py-2 text-sm text-white">
      <div>ResumeMaker</div>
      {/* UI Controls */}
      <div>UI Controls</div>
      {/* Download Control */}
      <div>
        <Button onClick={handlePrint}>Print</Button>
      </div>
    </div>
  );
};

export default memo(EditorNavBar);
