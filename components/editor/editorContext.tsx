import {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { useReactToPrint } from "react-to-print";

const defaultSection: Section = {
  personalDetails: {
    location: true,
    phone: true,
    email: true,
    website: true,
    linkedin: true,
  },
  picture: true,
  aboutMe: true,
  role: true,
  workExperience: true,
  education: true,
  skills: true,
  languages: false,
  hobbies: false,
};

type Section = {
  personalDetails: {
    location: boolean;
    phone: boolean;
    email: boolean;
    website: boolean;
    linkedin: boolean;
  };
  picture: boolean;
  aboutMe: boolean;
  role: boolean;
  workExperience: boolean;
  education: boolean;
  skills: boolean;
  languages: boolean;
  hobbies: boolean;
};
type IEditorContext = {
  editorRef?: MutableRefObject<HTMLDivElement | null>;
  handlePrint?: () => void;
  section: Section;
  setSection: Dispatch<SetStateAction<Section>>;
};

const editorContext = createContext<IEditorContext>({
  section: defaultSection,
  setSection: () => undefined,
});

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => editorRef.current,
  });
  const [section, setSection] = useState(defaultSection);

  return (
    <editorContext.Provider
      value={{
        editorRef,
        handlePrint,
        section,
        setSection,
      }}
    >
      {children}
    </editorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(editorContext);

  if (!context) {
    throw new Error("useEditor must be used under EditorProvider");
  }

  return context;
};
