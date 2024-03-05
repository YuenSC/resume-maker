import { AvailableFontKeyEnum } from "@/lib/fonts";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { EditorSectionConfig } from "@/lib/types/editor/EditorSectionConfig";
import { generateRandomId } from "@/lib/utils";
import {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
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
  name: "",
  role: "",
  aboutMe: {
    title: "",
    value: "",
  },
  personalDetails: {
    title: "",
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
  languages: {
    title: "",
    records: [{ title: "" }],
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
  typography: AvailableFontKeyEnum.inter,
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
    AvailableFontKeyEnum.inter,
  );

  const [editorResume, setEditorResume] = useLocalStorage<EditorResume>(
    "editor-resume",
    defaultResume,
  );

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
