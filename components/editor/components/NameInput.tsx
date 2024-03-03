import { Input } from "@/components/ui/input";
import { memo } from "react";
import { useEditor } from "../editorContext";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { EditorResume } from "@/lib/types/editor/EditorResume";

const NameInput = () => {
  const { register } = useFormContext<EditorResume>();
  const { sectionConfig } = useEditor();

  return (
    <div className="flex-1">
      <Textarea
        placeholder="Your Name"
        className="text-6xl font-semibold text-primary"
        rows={1}
        {...register("name")}
      />
      {sectionConfig.role && (
        <Input
          placeholder="Your Role"
          className="px-2.5"
          {...register("role")}
        />
      )}
    </div>
  );
};

export default memo(NameInput);
