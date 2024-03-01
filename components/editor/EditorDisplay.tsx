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
import { AvailableFonts } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import LanguageReorderedGrid from "./components/LanguageReorderedGrid";

const EditorDisplay = () => {
  const { editorRef, sectionConfig, typography } = useEditor();

  const currentFont = AvailableFonts.find(
    (item) => item.variable === typography,
  )?.value;

  return (
    <div
      ref={editorRef}
      className={cn(
        "grid aspect-[210/297] w-[1000px] gap-8  self-center bg-white p-12 print:w-[900px]",
        currentFont?.className,
      )}
      style={{
        gridTemplateColumns: "225px 1fr",
        gridTemplateRows: sectionConfig.photo ? "225px 1fr" : "5% 1fr",
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
        <LanguageReorderedGrid />
      </div>
    </div>
  );
};

export default memo(EditorDisplay);
