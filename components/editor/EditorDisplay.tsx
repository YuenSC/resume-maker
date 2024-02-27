"use client";

import { memo } from "react";
import PhotoUpload from "./components/PhotoUpload";
import { useEditor } from "./editorContext";
import NameInput from "./components/NameInput";
import AboutMe from "./components/AboutMe";
import PersonalDetail from "./components/PersonalDetail";

const EditorDisplay = () => {
  const { editorRef } = useEditor();

  return (
    <div
      ref={editorRef}
      className="grid aspect-[210/297] w-[1000px] gap-8  self-center bg-white p-12 print:w-[900px]"
      style={{
        gridTemplateColumns: "225px 1fr",
        gridTemplateRows: "225px 1fr",
      }}
    >
      <PhotoUpload />
      <div className="flex items-center">
        <NameInput />
      </div>

      <div className="flex flex-col gap-4">
        <AboutMe />
        <PersonalDetail />
      </div>

      <div>
        <div>Experience</div>
      </div>
    </div>
  );
};

export default memo(EditorDisplay);
