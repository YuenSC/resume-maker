import { Input } from "@/components/ui/input";
import { memo } from "react";
import { useEditor } from "../editorContext";
import { Textarea } from "@/components/ui/textarea";

const NameInput = () => {
  const {
    resume: { role, name },
    setResume,
  } = useEditor();

  return (
    <div className="flex-1">
      <Textarea
        value={name}
        isTitle
        placeholder="Your Name"
        className="text-5xl font-semibold text-primary"
        rows={1}
        onChange={(e) =>
          setResume((prev) => ({ ...prev, name: e.target.value }))
        }
      />
      <Input
        value={role}
        placeholder="Your Role"
        onChange={(e) =>
          setResume((prev) => ({ ...prev, role: e.target.value }))
        }
      />
    </div>
  );
};

export default memo(NameInput);
