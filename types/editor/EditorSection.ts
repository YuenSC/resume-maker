import { EditorPersonalDetailEnum } from "./EditorPersonalDetailEnum";

export type EditorSection = {
  personalDetails: Record<EditorPersonalDetailEnum, boolean>;
  photo: boolean;
  aboutMe: boolean;
  role: boolean;
  workExperience: boolean;
  education: boolean;
  skills: boolean;
  languages: boolean;
  hobbies: boolean;
};
