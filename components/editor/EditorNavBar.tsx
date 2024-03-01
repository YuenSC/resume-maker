"use client";

import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { memo } from "react";
import { CiSettings } from "react-icons/ci";
import { IoIosArrowUp } from "react-icons/io";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useEditor } from "./editorContext";
import { get, set } from "lodash";

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
  } = useEditor();

  return (
    <div className="fixed z-50 flex w-[calc(100%-2rem)] items-center justify-between rounded-xl bg-black px-4 py-2 text-sm text-white">
      <div>ResumeMaker</div>
      {/* UI Controls */}
      <div className="flex items-center">
        <Popover>
          <PopoverTrigger>
            <div className="group flex items-center">
              <CiSettings size={20} className="group-hover:opacity-50" />
              <p>Sections</p>
              <IoIosArrowUp className="ml-1" size={12} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="rounded-lg bg-white p-4 text-black shadow-lg">
            <PopoverArrow className="text-white" fill="white" />
            <div className="grid grid-cols-2">
              {switchSections.map(({ items, title }, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-start gap-1.5"
                >
                  {title && <div>{title}</div>}
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
      <div>
        <Button onClick={handlePrint}>Print</Button>
      </div>
    </div>
  );
};

export default memo(EditorNavBar);
