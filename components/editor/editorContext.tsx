import {
  MutableRefObject,
  ReactNode,
  createContext,
  useContext,
  useRef,
} from "react";
import { useReactToPrint } from "react-to-print";

type IEditorContext = {
  editorRef?: MutableRefObject<HTMLDivElement | null>;
  handlePrint?: () => void;
};

const editorContext = createContext<IEditorContext>({});

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => editorRef.current,
  });

  return (
    <editorContext.Provider
      value={{
        editorRef,
        handlePrint,
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
