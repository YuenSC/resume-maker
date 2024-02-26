import EditorContainer from "@/components/editor/EditorContainer";
import EditorDisplay from "@/components/editor/EditorDisplay";
import EditorNavBar from "@/components/editor/EditorNavBar";

export default function Home() {
  return (
    <main>
      <EditorContainer className="flex w-full flex-col gap-4">
        <EditorNavBar />
        <EditorDisplay />
      </EditorContainer>
    </main>
  );
}
