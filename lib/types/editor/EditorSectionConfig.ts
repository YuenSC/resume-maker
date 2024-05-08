import { EditorPersonalDetailEnum } from "./EditorPersonalDetailEnum";

export type EditorSectionConfig = {
  personalDetails: Record<EditorPersonalDetailEnum, boolean>;
  photo: boolean;
  aboutMe: boolean;
  role: boolean;
  workExperience: boolean;
  education: boolean;
  skills: boolean;
  languages: boolean;
  hobbies: boolean;
  certification: boolean;
  customLeftColumn1: boolean;
  customLeftColumn2: boolean;
};
