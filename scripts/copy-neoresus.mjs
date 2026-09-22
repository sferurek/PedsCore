import { cp, mkdir } from "node:fs/promises";
await mkdir(new URL("../apps/web/dist/neoresus/", import.meta.url), {
  recursive: true,
});
await cp(
  new URL("../apps/neoresus/dist/", import.meta.url),
  new URL("../apps/web/dist/neoresus/", import.meta.url),
  { recursive: true },
);
