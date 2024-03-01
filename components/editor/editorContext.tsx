import { EditorResume } from "@/lib/types/editor/EditorResume";
import { EditorSectionConfig } from "@/lib/types/editor/EditorSectionConfig";
import { generateRandomId } from "@/lib/utils";
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

const defaultSectionConfig: EditorSectionConfig = {
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
  workExperiences: {
    title: "",
    records: [
      {
        id: generateRandomId(),
        description: "",
        duration: "",
        position: "",
        title: "",
      },
      {
        id: generateRandomId(),
        description: "",
        duration: "",
        position: "",
        title: "",
      },
    ],
  },
  education: {
    title: "",
    records: [
      {
        id: generateRandomId(),
        school: "",
        degree: "",
        duration: "",
      },
      {
        id: generateRandomId(),
        school: "",
        degree: "",
        duration: "",
      },
    ],
  },
  skills: {
    title: "",
    records: [{ title: "" }],
  },
};

type IEditorContext = {
  editorRef?: MutableRefObject<HTMLDivElement | null>;
  handlePrint?: () => void;
  sectionConfig: EditorSectionConfig;
  setSectionConfig: Dispatch<SetStateAction<EditorSectionConfig>>;
  resume: EditorResume;
  setResume: Dispatch<SetStateAction<EditorResume>>;
};

const editorContext = createContext<IEditorContext>({
  sectionConfig: defaultSectionConfig,
  setSectionConfig: () => undefined,
  resume: defaultResume,
  setResume: () => undefined,
});

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [sectionConfig, setSectionConfig] = useState(defaultSectionConfig);
  const [resume, setResume] = useState(defaultResume);

  const editorRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => editorRef.current,
    documentTitle: `${resume.name}_Resume`,
    onBeforeGetContent: () => {},
  });

  const value = useMemo(
    () => ({
      editorRef,
      handlePrint,
      sectionConfig,
      setSectionConfig,
      resume,
      setResume,
    }),
    [handlePrint, resume, sectionConfig],
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
