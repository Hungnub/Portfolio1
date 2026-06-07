import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(root, "..");
const dist = join(projectRoot, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

await cp(join(projectRoot, "index.html"), join(dist, "index.html"));
await cp(join(projectRoot, "src"), join(dist, "src"), { recursive: true });
await cp(join(projectRoot, "public"), join(dist, "public"), { recursive: true });
