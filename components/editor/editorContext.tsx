import { EditorResume } from "@/types/editor/EditorResume";
import { EditorSection } from "@/types/editor/EditorSection";
import {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useReactToPrint } from "react-to-print";

const defaultSection: EditorSection = {
  personalDetails: {
    location: true,
    phone: true,
    email: true,
    website: true,
    linkedin: true,
  },
  photo: true,
  aboutMe: true,
  role: true,
  workExperience: true,
  education: true,
  skills: true,
  languages: false,
  hobbies: false,
};

const defaultResume: EditorResume = {
  photo: "",
  name: "",
  role: "",
  aboutMe: {
    title: "About Me",
    value: "",
  },
  personalDetails: {
    title: "Personal Details",
    location: "",
    phone: "",
    email: "",
    website: "",
    linkedin: "",
  },
};

type IEditorContext = {
  editorRef?: MutableRefObject<HTMLDivElement | null>;
  handlePrint?: () => void;
  section: EditorSection;
  setSection: Dispatch<SetStateAction<EditorSection>>;
  resume: EditorResume;
  setResume: Dispatch<SetStateAction<EditorResume>>;
};

const editorContext = createContext<IEditorContext>({
  section: defaultSection,
  setSection: () => undefined,
  resume: defaultResume,
  setResume: () => undefined,
});

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [section, setSection] = useState(defaultSection);
  const [resume, setResume] = useState(defaultResume);

  const editorRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => editorRef.current,
    documentTitle: `${resume.name}_Resume`,
    onBeforeGetContent: () => {},
  });

  const value = useMemo(
    () => ({ editorRef, handlePrint, section, setSection, resume, setResume }),
    [handlePrint, resume, section],
  );

  return (
    <editorContext.Provider value={value}>{children}</editorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(editorContext);

  if (!context) {
    throw new Error("useEditor must be used under EditorProvider");
  }

  return context;
};
