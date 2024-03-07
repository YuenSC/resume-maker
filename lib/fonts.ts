import { Inter, Nunito, Open_Sans, Poppins, Roboto } from "next/font/google";

export enum AvailableFontKeyEnum {
  inter = "--font-inter",
  poppins = "--font-poppins",
  roboto = "--font-roboto",
  openSans = "--font-openSans",
  nunito = "--font-nunito",
}

const inter = Inter({
  subsets: ["latin"],
  variable: AvailableFontKeyEnum.inter,
});
const poppins = Poppins({
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
export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: AvailableFontKeyEnum.nunito,
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
  {
    label: "Nunito",
    variable: AvailableFontKeyEnum.nunito,
    value: nunito,
  },
];

export const FontsVariables = AvailableFonts.map(
  (font) => font.value.variable,
).join(" ");
