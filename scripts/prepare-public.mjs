import { basename, join } from "node:path";
import { copyFile, cp, mkdir, rm } from "node:fs/promises";

const root = process.cwd();
const publicDir = join(root, "public");

await rm(publicDir, { recursive: true, force: true });
await mkdir(publicDir, { recursive: true });

for (const file of ["index.html", "styles.css", "script.js"]) {
  await copyFile(join(root, file), join(publicDir, file));
}

const shouldCopy = (source) => {
  const name = basename(source);
  return name !== ".DS_Store" && name !== "zkproofport-logo-original.png";
};

for (const directory of [
  "assets",
  "application",
  "contracts",
  "deck",
  "demo",
  "one-pager",
  "team",
]) {
  await cp(join(root, directory), join(publicDir, directory), {
    recursive: true,
    filter: shouldCopy,
  });
}
