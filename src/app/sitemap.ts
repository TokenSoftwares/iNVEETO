import type { MetadataRoute } from "next";
import { locales } from "@/content/i18n";
import { site } from "@/content/site";

const paths = ["", "/features", "/use-cases", "/use-cases/venues", "/customer-stories", "/pricing", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${site.url}/${l}${p}`,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${site.url}/${x}${p}`])) },
    })),
  );
}
