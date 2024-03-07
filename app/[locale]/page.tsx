import EditorContainer from "@/components/editor/EditorContainer";
import EditorDisplay from "@/components/editor/EditorDisplay";
import EditorNavBar from "@/components/editor/EditorNavBar";

export default function Home() {
  return (
    <EditorContainer>
      <EditorNavBar />
      <div className="mt-20 self-center">
        <EditorDisplay />
      </div>
    </EditorContainer>
  );
}
