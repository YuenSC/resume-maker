import { EditorPersonalDetailEnum } from "./EditorPersonalDetailEnum";

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
};
