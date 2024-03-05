import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./lib/i18n";

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  localePrefix,

  // Used when no locale matches
  defaultLocale: locales[0],
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(zh|en|ja)/:path*"],
};
