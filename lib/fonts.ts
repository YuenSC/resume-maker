import { Inter, Open_Sans, Poppins, Roboto } from "next/font/google";

export enum AvailableFontKeyEnum {
  inter = "--font-inter",
  poppins = "--font-poppins",
  roboto = "--font-roboto",
  openSans = "--font-openSans",
}

const inter = Inter({
  subsets: ["latin"],
  variable: AvailableFontKeyEnum.inter,
});
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: AvailableFontKeyEnum.poppins,
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: AvailableFontKeyEnum.roboto,
});
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: AvailableFontKeyEnum.openSans,
});

export const AvailableFonts = [
  {
    label: "Inter",
    variable: AvailableFontKeyEnum.inter,
    value: inter,
  },
  {
    label: "Poppins",
    variable: AvailableFontKeyEnum.poppins,
    value: poppins,
  },
  {
    label: "Roboto",
    variable: AvailableFontKeyEnum.roboto,
    value: roboto,
  },
  {
    label: "Open Sans",
    variable: AvailableFontKeyEnum.openSans,
    value: openSans,
  },
];

export const FontsVariables = AvailableFonts.map(
  (font) => font.value.variable,
).join(" ");
