"use client";

import { memo } from "react";
import TextSection from "./components/TextSection";
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
import CertificationTextSection from "./components/CertificationTextSection";
import { useTranslations } from "next-intl";

const EditorDisplay = () => {
  const { editorRef, sectionConfig, typography } = useEditor();

  const t = useTranslations("editor");

  const currentFont = AvailableFonts.find(
    (item) => item.variable === typography,
  )?.value;

  return (
    <div
      ref={editorRef}
      className={cn(
        "flex h-[1400px] w-[1000px] flex-col gap-6 self-center bg-white px-12 py-16",
        currentFont?.className,
      )}
    >
      <div className="col-span-2 flex w-full items-center gap-8">
        <PhotoUpload />
        <NameInput />
      </div>

      <div className="flex gap-8">
        <div className="flex w-[28%] flex-col gap-8">
          <TextSection
            titlePlaceholder={t("about-me")}
            valuePlaceholder={t("enter-your-professional-summary")}
            titleFieldName="aboutMe.title"
            valueFieldName="aboutMe.value"
            sectionConfigKey="aboutMe"
          />
          <PersonalDetail />
          <TextSection
            titlePlaceholder={t("custom-1")}
            valuePlaceholder={t("enter-your-detail")}
            titleFieldName="customLeftColumn1.title"
            valueFieldName="customLeftColumn1.value"
            sectionConfigKey="customLeftColumn1"
          />
          <TextSection
            titlePlaceholder={t("custom-2")}
            valuePlaceholder={t("enter-your-detail")}
            titleFieldName="customLeftColumn2.title"
            valueFieldName="customLeftColumn2.value"
            sectionConfigKey="customLeftColumn2"
          />
        </div>

        <div className="flex flex-1 flex-col gap-8 pt-1">
          <ExperienceReorderedList />
          <EducationReorderedList />
          <CertificationTextSection />
          <SkillReorderedGrid />
          <LanguageReorderedGrid />
        </div>
      </div>
    </div>
  );
};

export default memo(EditorDisplay);
