"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { memo } from "react";
import { Button } from "../ui/button";
import * as htmlToImage from "html-to-image";
import generatePDF from "react-to-pdf";
import { useEditor } from "./editorContext";

const EditorNavBar = () => {
  const { handlePrint } = useEditor();

  return (
    <div className="sticky flex items-center justify-between rounded-xl bg-black px-4 py-2 text-sm text-white">
      <div>ResumeMaker</div>
      {/* UI Controls */}
      <div>UI Controls</div>
      {/* Download Control */}
      <div>
        <Button onClick={handlePrint}>Print</Button>
      </div>
    </div>
  );
};

export default memo(EditorNavBar);
