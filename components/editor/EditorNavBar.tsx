"use client";

import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { memo, useEffect } from "react";
import { CiSettings } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Button, buttonVariants } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useEditor } from "./editorContext";
import { get, set } from "lodash";
import { FaFont } from "react-icons/fa";
import { AvailableFontKeyEnum, AvailableFonts } from "@/lib/fonts";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "../ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LanguagesIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { locales, useRouter } from "@/lib/i18n";
import { useTranslations } from "next-intl";

const switchSections = [
  {
    title: "Personal Details",
    items: [
      {
        key: "personalDetails.location",
        label: "Location",
      },
      {
        key: "personalDetails.phone",
        label: "Phone",
      },
      {
        key: "personalDetails.email",
        label: "Email",
      },
      {
        key: "personalDetails.website",
        label: "Website",
      },
      {
        key: "personalDetails.linkedin",
        label: "Linkedin",
      },
    ],
  },
  {
    title: "",
    items: [
      {
        key: "photo",
        label: "Photo",
      },
      {
        key: "aboutMe",
        label: "About Me",
      },
      {
        key: "role",
        label: "Role",
      },
      {
        key: "workExperience",
        label: "Work Experience",
      },
      {
        key: "education",
        label: "Education",
      },
      {
        key: "certification",
        label: "Certification",
      },
      {
        key: "skills",
        label: "Skills",
      },
      {
        key: "languages",
        label: "Languages",
      },
      {
        key: "hobbies",
        label: "Hobbies",
      },
    ],
  },
];

const EditorNavBar = () => {
  const {
    handlePrint,
    setSectionConfig: setSection,
    sectionConfig,
    typography,
    setTypography,
    reset,
  } = useEditor();

  const params = useParams<{ locale: string }>();

  const t = useTranslations();
  const router = useRouter();

  return (
    <div className="fixed z-50 flex w-[calc(100vw-2.5rem)] min-w-[calc(1024px-2.5rem)] items-center justify-between rounded-xl bg-black px-4 py-2 text-sm text-white">
      <div>{t("title")}</div>
      {/* UI Controls */}
      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-4 ">
        <Popover>
          <PopoverTrigger>
            <div className="group flex items-center">
              <FaFont size={16} className="mr-1 group-hover:opacity-50" />
              <p className="text-xs">{t("control.typography")}</p>
              <IoIosArrowDown className="ml-1" size={12} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="rounded-lg bg-white p-4 text-black shadow-lg">
            <PopoverArrow className="text-white" fill="white" />
            <div className="flex flex-col gap-2">
              <Label className="text-xs">{t("control.typography")}</Label>
              <Select
                defaultValue={typography}
                onValueChange={(value) => {
                  setTypography(value as AvailableFontKeyEnum);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  {AvailableFonts.map(({ label, variable }) => (
                    <SelectItem
                      key={variable}
                      value={variable}
                      className="text-xs text-black"
                    >
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <div className="group flex items-center">
              <CiSettings size={20} className="group-hover:opacity-50" />
              <p className="text-xs">{t("control.sections")}</p>
              <IoIosArrowDown className="ml-1" size={12} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto rounded-lg bg-white p-4 text-black shadow-lg">
            <PopoverArrow className="text-white" fill="white" />
            <div className="grid grid-cols-2">
              {switchSections.map(({ items, title }, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-start gap-1.5"
                >
                  {title && (
                    <div className="h-5 text-sm font-semibold">{title}</div>
                  )}
                  {items.map((item) => (
                    <div key={item.key} className="flex h-5 items-center gap-2">
                      <Switch
                        id={item.label}
                        checked={get(sectionConfig, item.key)}
                        onCheckedChange={(checked) => {
                          setSection((prev) => {
                            const copy = { ...prev };
                            return set(copy, item.key, checked);
                          });
                        }}
                      />
                      <Label htmlFor={item.label}>{item.label}</Label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {/* Download Control */}
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center gap-2">
            <LanguagesIcon size={16} />
            <p>{t(`i18n.${params.locale}`)}</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-black">
            <DropdownMenuLabel>{t("control.languages")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={params.locale}
              onValueChange={(locale) => {
                router.replace(`./${locale}`);
              }}
            >
              {locales.map((locale) => (
                <DropdownMenuRadioItem key={locale} value={locale}>
                  {t(`i18n.${locale}`)}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog>
          <AlertDialogTrigger
            className={buttonVariants({ variant: "destructive" })}
          >
            {t("control.reset")}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Warning</AlertDialogTitle>
              <AlertDialogDescription>
                {t("control.reset-warning")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={reset}>
                {t("control.reset")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button onClick={handlePrint}>{t("control.print")}</Button>
      </div>
    </div>
  );
};

export default memo(EditorNavBar);
