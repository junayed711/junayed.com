import { getCollection } from "astro:content";

// "The lab" -> "the-lab"
export function seriesSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getSeriesPosts(name: string) {
  const posts = (await getCollection("blog"))
    .filter((post) => !post.data.draft && post.data.series === name)
    .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
  const orders = posts.map((post) => post.data.order);
  if (orders.includes(undefined) || new Set(orders).size !== orders.length) {
    throw new Error(`Every post in the series "${name}" needs its own order.`);
  }
  return posts;
}

export async function getAllSeries() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return [...new Set(posts.flatMap((post) => post.data.series ?? []))].sort();
}

type Dated = { data: { date: Date; series?: string; order?: number } };

// Posts published on the same day stay together by series, and within a
// series the later post comes first.
export function newestFirst(a: Dated, b: Dated) {
  return (
    b.data.date.valueOf() - a.data.date.valueOf() ||
    (b.data.series ?? "").localeCompare(a.data.series ?? "") ||
    (b.data.order ?? 0) - (a.data.order ?? 0)
  );
}
