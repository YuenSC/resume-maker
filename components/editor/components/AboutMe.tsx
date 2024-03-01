import { memo } from "react";
import { useEditor } from "../editorContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DottedLineBox from "@/components/DottedLineBox";

const AboutMe = () => {
  const {
    resume: { aboutMe },
    setResume,
    sectionConfig,
  } = useEditor();

  if (!sectionConfig.aboutMe) return null;

  return (
    <DottedLineBox>
      <Input
        placeholder="ABOUT ME"
        isTitle
        value={aboutMe.title}
        onChange={(e) =>
          setResume((prev) => ({
            ...prev,
            aboutMe: {
              ...prev.aboutMe,
              title: e.target.value,
            },
          }))
        }
      />
      <Textarea
        placeholder="Enter your professional summary"
        value={aboutMe.value}
        onChange={(e) =>
          setResume((prev) => ({
            ...prev,
            aboutMe: {
              ...prev.aboutMe,
              value: e.target.value,
            },
          }))
        }
      />
    </DottedLineBox>
  );
};

export default memo(AboutMe);
