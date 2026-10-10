import { describe, expect, it } from "vitest";
import { getSeoTopicHub, seoTopicHubs } from "./topicHubs";

const indexedTopicSlugs = [
  "pediatric-head-injury-rules",
  "neonatal-pain-scales",
  "neonatal-encephalopathy-scores",
  "pediatric-asthma-wheeze-scores",
  "pediatric-febrile-infant-tools",
  "pediatric-intensive-care-scores",
  "pediatric-kidney-function-aki-tools",
  "preterm-pediatric-growth-tools",
  "pediatric-croup-scores"
] as const;

describe("SEO topic hubs", () => {
  it("keeps every indexed topic hub available after hydration", () => {
    expect(seoTopicHubs.map((hub) => hub.slug)).toEqual(indexedTopicSlugs);
    for (const slug of indexedTopicSlugs) {
      const hub = getSeoTopicHub(slug);
      expect(hub, slug).toBeDefined();
      expect(hub?.toolIds.length, slug).toBeGreaterThan(1);
      expect(hub?.title.es, slug).toBeTruthy();
      expect(hub?.title.en, slug).toBeTruthy();
    }
  });

  it("does not resolve unknown topic routes", () => {
    expect(getSeoTopicHub("not-a-real-topic")).toBeUndefined();
  });
});
