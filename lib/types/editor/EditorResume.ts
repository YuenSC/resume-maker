import { EditorPersonalDetailEnum } from "./EditorPersonalDetailEnum";

type WorkExperienceRecord = {
  id: string;
  title: string;
  position: string;
  duration: string;
  description: string;
};

type EducationRecord = {
  id: string;
  school: string;
  degree: string;
  duration: string;
};

export type EditorResume = {
  photo: string;
  name: string;
  role: string;
  aboutMe: {
    title: string;
    value: string;
  };
  personalDetails: Record<EditorPersonalDetailEnum, string> & {
    title: string;
  };

  workExperiences: {
    title: string;
    records: Array<WorkExperienceRecord>;
  };

  education: {
    title: string;
    records: Array<EducationRecord>;
  };
  certification: {
    title: string;
    value: string;
  };
  skills: {
    title: string;
    records: { title: string }[];
  };
  languages: {
    title: string;
    records: { title: string }[];
  };
  customLeftColumn1: {
    title: string;
    value: string;
  };
  customLeftColumn2: {
    title: string;
    value: string;
  };
};
