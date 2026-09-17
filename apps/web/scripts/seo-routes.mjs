export const productionBaseUrl = "https://peds-core.vercel.app";

export const indexableCategories = [
  "neonatology",
  "respiratory",
  "emergency",
  "cardiology",
  "nephrology",
  "intensive_care",
  "growth_nutrition",
  "pain",
  "neurology",
  "rheumatology",
  "gastroenterology",
  "behavioral_health",
  "resuscitation",
  "adolescent_medicine"
];

const topicSlugs = [
  "pediatric-head-injury-rules",
  "neonatal-pain-scales",
  "neonatal-encephalopathy-scores",
  "pediatric-asthma-wheeze-scores"
];

const staticPaths = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/es", priority: "0.9", changefreq: "weekly" },
  { path: "/en", priority: "0.9", changefreq: "weekly" },
  { path: "/es/tools", priority: "0.9", changefreq: "weekly" },
  { path: "/en/tools", priority: "0.9", changefreq: "weekly" },
  { path: "/es/evidence", priority: "0.8", changefreq: "monthly" },
  { path: "/en/evidence", priority: "0.8", changefreq: "monthly" },
  { path: "/es/stats/global", priority: "0.5", changefreq: "weekly" },
  { path: "/en/stats/global", priority: "0.5", changefreq: "weekly" },
  { path: "/es/about", priority: "0.6", changefreq: "monthly" },
  { path: "/en/about", priority: "0.6", changefreq: "monthly" },
  { path: "/es/disclaimer", priority: "0.5", changefreq: "monthly" },
  { path: "/en/disclaimer", priority: "0.5", changefreq: "monthly" },
  { path: "/es/contribute", priority: "0.6", changefreq: "monthly" },
  { path: "/en/contribute", priority: "0.6", changefreq: "monthly" }
];

export const getCanonicalSeoEntries = (tools) => {
  const categoryPaths = indexableCategories.flatMap((category) => [
    { path: `/es/categories/${category}`, priority: "0.7", changefreq: "monthly" },
    { path: `/en/categories/${category}`, priority: "0.7", changefreq: "monthly" }
  ]);
  const topicPaths = topicSlugs.flatMap((slug) => [
    { path: `/es/topics/${slug}`, priority: "0.8", changefreq: "monthly" },
    { path: `/en/topics/${slug}`, priority: "0.8", changefreq: "monthly" }
  ]);
  const toolPaths = tools.flatMap((tool) => [
    { path: `/es/tools/${tool.slug}`, priority: "0.7", changefreq: "monthly" },
    { path: `/en/tools/${tool.slug}`, priority: "0.7", changefreq: "monthly" }
  ]);

  return [...staticPaths, ...categoryPaths, ...topicPaths, ...toolPaths];
};

export const toCanonicalUrl = (path) =>
  `${productionBaseUrl}${path === "/" ? "/" : path}`;
