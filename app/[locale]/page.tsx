import EditorContainer from "@/components/editor/EditorContainer";
import EditorDisplay from "@/components/editor/EditorDisplay";
import EditorNavBar from "@/components/editor/EditorNavBar";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("control");

  return (
    <main>
      <EditorContainer>
        <EditorNavBar />
        <div className="mt-20 self-center">
          {t("typography")}
          <EditorDisplay />
        </div>
      </EditorContainer>
    </main>
  );
}
