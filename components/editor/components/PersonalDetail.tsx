import DottedLineBox from "@/components/DottedLineBox";
import { Input } from "@/components/ui/input";
import { EditorPersonalDetailEnum } from "@/lib/types/editor/EditorPersonalDetailEnum";
import { memo, useMemo } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedin, FaLocationDot } from "react-icons/fa6";
import { MdEmail, MdOutlineWebAsset } from "react-icons/md";
import { useEditor } from "../editorContext";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useController, useFormContext } from "react-hook-form";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { register } from "module";

const IconInput = ({
  name,
  personalDetailKey,
}: {
  name: string;
  personalDetailKey: EditorPersonalDetailEnum;
}) => {
  const { register } = useFormContext<EditorResume>();
  const { field } = useController({
    name,
  });

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
          <p className="whitespace-pre-line break-all p-2 text-sm ">
            {field.value || placeholder}
          </p>
        );

      case EditorPersonalDetailEnum.email:
        return (
          <Link href={`mailto:${field.value}`}>
            <p className="break-all p-2 text-sm">
              {field.value || placeholder}
            </p>
          </Link>
        );
      case EditorPersonalDetailEnum.linkedin:
      case EditorPersonalDetailEnum.website:
        return (
          <Link href={field.value}>
            <p className="break-all p-2 text-sm">
              {field.value || placeholder}
            </p>
          </Link>
        );
    }
  }, [field.value, personalDetailKey, placeholder]);

  return (
    <div className="flex gap-2">
      <div className="flex h-[36px] items-center">
        <Icon size={18} className="text-primary" />
      </div>
      <div className="min-h-9 flex-1">
        <Textarea
          className="h-9 break-all text-sm print:hidden"
          placeholder={placeholder}
          {...field}
        />

        <div className="hidden print:block">{printElement}</div>
      </div>
    </div>
  );
};

const PersonalDetail = () => {
  const { register } = useFormContext<EditorResume>();

  const { sectionConfig } = useEditor();

  const isAllFieldsHidden = Object.entries(sectionConfig.personalDetails).every(
    ([key, shown]) => !shown,
  );

  if (!sectionConfig.personalDetails || isAllFieldsHidden) return null;

  return (
    <DottedLineBox>
      <Input
        placeholder="PERSONAL DETAILS"
        isTitle
        className="mb-4"
        {...register("personalDetails.title")}
      />
      <div className="ml-2 flex flex-col gap-1">
        {Object.keys(EditorPersonalDetailEnum).map((key) => {
          if (!sectionConfig.personalDetails[key as EditorPersonalDetailEnum])
            return null;

          return (
            <IconInput
              key={key}
              personalDetailKey={key as EditorPersonalDetailEnum}
              name={`personalDetails.${key}`}
            />
          );
        })}
      </div>
    </DottedLineBox>
  );
};

export default memo(PersonalDetail);
