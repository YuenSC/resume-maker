import DottedLineBox from "@/components/DottedLineBox";
import { Input } from "@/components/ui/input";
import { EditorPersonalDetailEnum } from "@/types/editor/EditorPersonalDetailEnum";
import { memo, useMemo } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedin, FaLocationDot } from "react-icons/fa6";
import { MdEmail, MdOutlineWebAsset } from "react-icons/md";
import { useEditor } from "../editorContext";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const IconInput = ({
  personalDetailKey,
  onChange,
  value,
}: {
  personalDetailKey: EditorPersonalDetailEnum;
  value: string;
  onChange: (text: string) => void;
}) => {
  const { Icon, placeholder } = useMemo(() => {
    switch (personalDetailKey) {
      case EditorPersonalDetailEnum.email:
        return { Icon: MdEmail, placeholder: "Enter email" };
      case EditorPersonalDetailEnum.linkedin:
        return { Icon: FaLinkedin, placeholder: "Enter linkedin URL" };
      case EditorPersonalDetailEnum.location:
        return { Icon: FaLocationDot, placeholder: "Enter Location" };
      case EditorPersonalDetailEnum.phone:
        return { Icon: FaPhoneAlt, placeholder: "Enter phone" };
      case EditorPersonalDetailEnum.website:
        return { Icon: MdOutlineWebAsset, placeholder: "Enter Website" };
    }
  }, [personalDetailKey]);

  const printElement = useMemo(() => {
    switch (personalDetailKey) {
      case EditorPersonalDetailEnum.location:
      case EditorPersonalDetailEnum.phone:
        return (
          <p className="whitespace-pre-line break-all p-2 text-sm ">{value}</p>
        );

      case EditorPersonalDetailEnum.email:
        return (
          <Link href={`mailto:${value}`}>
            <p className="break-all p-2 text-sm">{value}</p>
          </Link>
        );
      case EditorPersonalDetailEnum.linkedin:
      case EditorPersonalDetailEnum.website:
        return (
          <Link href={value}>
            <p className="break-all p-2 text-sm">{value}</p>
          </Link>
        );
    }
  }, [personalDetailKey, value]);

  return (
    <div className="flex  gap-2">
      <div className="flex h-[36px] items-center">
        <Icon size={18} className="text-primary" />
      </div>
      <div className="min-h-9 flex-1">
        <Textarea
          value={value}
          className="h-9 break-all text-sm print:hidden"
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />

        <div className="hidden print:block">{printElement}</div>
      </div>
    </div>
  );
};

const PersonalDetail = () => {
  const {
    resume: { personalDetails },
    setResume,
    section,
  } = useEditor();

  if (!section.aboutMe) return null;

  return (
    <DottedLineBox>
      <Input
        placeholder="Personal Detail"
        isTitle
        className="mb-4"
        value={personalDetails.title}
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
      <div
        className="ml-2 flex flex-col gap-1
      "
      >
        {Object.keys(EditorPersonalDetailEnum).map((key) => {
          return (
            <IconInput
              key={key}
              personalDetailKey={key as EditorPersonalDetailEnum}
              value={personalDetails[key as EditorPersonalDetailEnum]}
              onChange={(text) =>
                setResume((prev) => ({
                  ...prev,
                  personalDetails: {
                    ...prev.personalDetails,
                    [key]: text,
                  },
                }))
              }
            />
          );
        })}
      </div>
    </DottedLineBox>
  );
};

export default memo(PersonalDetail);
