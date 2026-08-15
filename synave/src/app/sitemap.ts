import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  {
    path: "/creation-societe",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  { path: "/realisations", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/a-propos", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
