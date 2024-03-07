import { AvailableFontKeyEnum } from "@/lib/fonts";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { EditorSectionConfig } from "@/lib/types/editor/EditorSectionConfig";
import {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { useLocalStorage } from "usehooks-ts";

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
  name: "YUEN Sing Chun (Calvin)",
  role: "Frontend Developer",
  aboutMe: {
    title: "",
    value:
      "Mid-level Frontend Developer with experience in building web and mobile app using React, React Native, and Typescript. A team player with a strong ability to collaborate with cross-functional teams and effectively communicate technical concepts. Currently seeking opportunity in Japan to further contribute and grow.",
  },
  personalDetails: {
    title: "",
    location: "Hong Kong",
    phone: "(852) 5168 7161",
    email: "scyuenab@gmail.com",
    website: "https://portfolio-calvin-yuen.vercel.app/works",
    linkedin: "https://www.linkedin.com/in/sing-chun-yuen-423a09185/",
  },
  workExperiences: {
    title: "",
    records: [
      {
        id: "id_1709620409671",
        description:
          '- Actively engaged in the development of numerous features for the mobile app "A.Life" by React Native\n- Developed and implemented multiple features for the "HUMA by AXA" mobile app using React Native.\n- Build the CMS of the "A.Life" and "HUMA by AXA" by Next.js',
        duration: "",
        position: "FRONTEND ENGINEER",
        title: "App Bar",
      },
      {
        id: "id_1709620409671",
        description:
          '- Build the tenant management website of Airside from scratch\n- Develop plenty of features for the school management console named "Compus"',
        duration: "",
        position: "WEB DEVELOPER",
        title: "Talkbox Limited",
      },
    ],
  },
  education: {
    title: "",
    records: [
      {
        id: "id_1709620409671",
        school: "The Hong Kong University of Science and Technology",
        degree:
          "BACHELOR OF ENGINEERING IN ELECTRONIC ENGINEERING WITH  FIRST CLASS HONOR",
        duration: "2017-2021",
      },
    ],
  },
  skills: {
    title: "",
    records: [
      {
        title: "React Native",
      },
      {
        title: "React",
      },
      {
        title: "Typesciprt",
      },
      {
        title: "Next.js",
      },
      {
        title: "Redux",
      },
      {
        title: "Git",
      },
      {
        title: "AWS Solution Architect",
      },
    ],
  },
  languages: {
    title: "",
    records: [
      {
        title: "English",
      },
      {
        title: "Mandarin",
      },
      {
        title: "Cantonese (Native)",
      },
      {
        title: "Japanese (JLPT N3)",
      },
    ],
  },
};

type IEditorContext = {
  editorRef?: MutableRefObject<HTMLDivElement | null>;
  handlePrint?: () => void;
  sectionConfig: EditorSectionConfig;
  setSectionConfig: Dispatch<SetStateAction<EditorSectionConfig>>;
  typography: AvailableFontKeyEnum;
  setTypography: Dispatch<SetStateAction<AvailableFontKeyEnum>>;
  reset: () => void;
};

const editorContext = createContext<IEditorContext>({
  sectionConfig: defaultSectionConfig,
  setSectionConfig: () => undefined,
  typography: AvailableFontKeyEnum.nunito,
  setTypography: () => undefined,
  reset: () => undefined,
});

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [sectionConfig, setSectionConfig] = useLocalStorage(
    "editor-section-config",
    defaultSectionConfig,
  );
  const [typography, setTypography] = useLocalStorage(
    "editor-typography",
    AvailableFontKeyEnum.nunito,
  );

  const [editorResume, setEditorResume] = useLocalStorage<EditorResume>(
    "editor-resume",
    defaultResume,
  );

  console.log(editorResume);

  const form = useForm<EditorResume>({
    defaultValues: editorResume,
    mode: "onBlur",
  });
  const { handleSubmit, getValues, reset } = form;
  const onSubmit: SubmitHandler<EditorResume> = useCallback(
    (values) => {
      setEditorResume(values);
    },
    [setEditorResume],
  );

  const editorRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => editorRef.current,
    documentTitle: `${getValues("name")}_Resume`,
    onBeforeGetContent: () => {},
  });

  const value = useMemo(
    () => ({
      editorRef,
      handlePrint,
      sectionConfig,
      setSectionConfig,
      typography,
      setTypography,
      reset: () => {
        setSectionConfig(defaultSectionConfig);
        setTypography(AvailableFontKeyEnum.inter);
        setEditorResume(defaultResume);
        reset(defaultResume);
      },
    }),
    [
      handlePrint,
      reset,
      sectionConfig,
      setEditorResume,
      setSectionConfig,
      setTypography,
      typography,
    ],
  );

  return (
    <FormProvider {...form}>
      <form
        onBlur={handleSubmit(onSubmit)}
        onSubmit={(e) => e.preventDefault()}
      >
        <editorContext.Provider value={value}>
          {children}
        </editorContext.Provider>
      </form>
    </FormProvider>
  );
};

export const useEditor = () => {
  const context = useContext(editorContext);

  if (!context) {
    throw new Error("useEditor must be used under EditorProvider");
  }

  return context;
};
