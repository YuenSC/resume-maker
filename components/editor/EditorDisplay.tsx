"use client";

import { memo } from "react";
import AboutMe from "./components/AboutMe";
import ExperienceReorderedList from "./components/ExperienceReorderedList";
import NameInput from "./components/NameInput";
import PersonalDetail from "./components/PersonalDetail";
import PhotoUpload from "./components/PhotoUpload";
import { useEditor } from "./editorContext";
import EducationReorderedList from "./components/EducationReorderedList";
import SkillReorderedGrid from "./components/SkillReorderedGrid";

const EditorDisplay = () => {
  const { editorRef, section } = useEditor();

  return (
    <div
      ref={editorRef}
      className="grid aspect-[210/297] w-[1000px] gap-8  self-center bg-white p-12 print:w-[900px]"
      style={{
        gridTemplateColumns: "225px 1fr",
        gridTemplateRows: section.photo ? "225px 1fr" : "5% 1fr",
      }}
    >
      <div className="col-span-2 flex w-full items-center gap-8">
        <PhotoUpload />
        <NameInput />
      </div>

      <div className="flex flex-col gap-4">
        <AboutMe />
        <PersonalDetail />
      </div>

      <div className="flex flex-col gap-4">
        <ExperienceReorderedList />
        <EducationReorderedList />
        <SkillReorderedGrid />
      </div>
    </div>
  );
};

export default memo(EditorDisplay);
