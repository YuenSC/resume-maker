import { EditorPersonalDetailEnum } from "./EditorPersonalDetailEnum";

type WorkExperienceRecord = {
  id: string;
  title: string;
  position: string;
  duration: string;
  description: string;
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
};
