import DottedLineBox from "@/components/DottedLineBox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditorPersonalDetailEnum } from "@/lib/types/editor/EditorPersonalDetailEnum";
import { EditorResume } from "@/lib/types/editor/EditorResume";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { memo, useMemo } from "react";
import { useController, useFormContext } from "react-hook-form";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedin, FaLocationDot } from "react-icons/fa6";
import { MdEmail, MdOutlineWebAsset } from "react-icons/md";
import { useEditor } from "../editorContext";

const IconInput = ({
  name,
  personalDetailKey,
}: {
  name: string;
  personalDetailKey: EditorPersonalDetailEnum;
}) => {
  const t = useTranslations("personalDetails");

  const { field } = useController({
    name,
  });

  const { Icon, placeholder } = useMemo(() => {
    switch (personalDetailKey) {
      case EditorPersonalDetailEnum.email:
        return { Icon: MdEmail, placeholder: t("enter-email") };
      case EditorPersonalDetailEnum.linkedin:
        return { Icon: FaLinkedin, placeholder: t("enter-linkedin-url") };
      case EditorPersonalDetailEnum.location:
        return { Icon: FaLocationDot, placeholder: t("enter-location") };
      case EditorPersonalDetailEnum.phone:
        return { Icon: FaPhoneAlt, placeholder: t("enter-phone") };
      case EditorPersonalDetailEnum.website:
        return { Icon: MdOutlineWebAsset, placeholder: t("enter-website") };
    }
  }, [personalDetailKey, t]);

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
          <Link
            href={field.value ?? "https://portfolio-calvin-yuen.vercel.app/"}
          >
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

  const t = useTranslations("personalDetails");

  if (!sectionConfig.personalDetails || isAllFieldsHidden) return null;

  return (
    <DottedLineBox>
      <Input
        placeholder={t("personal-details")}
        isTitle
        className="mb-2"
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
