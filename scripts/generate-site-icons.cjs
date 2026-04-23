/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");
const pngToIco = require("png-to-ico");

const root = path.join(__dirname, "..");
const appDir = path.join(root, "app");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="72" fill="#f7f2ea"/>
  <rect x="20" y="20" width="472" height="472" rx="62" fill="none" stroke="#6b5344" stroke-opacity="0.35" stroke-width="4"/>
  <text x="256" y="314" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="220" fill="#2a2118">AG</text>
</svg>`;

async function main() {
  const base = sharp(Buffer.from(svg));
  await base.clone().png().toFile(path.join(appDir, "icon.png"));
  const png16 = await base.clone().resize(16, 16).png().toBuffer();
  const png32 = await base.clone().resize(32, 32).png().toBuffer();
  const png48 = await base.clone().resize(48, 48).png().toBuffer();
  const ico = await pngToIco([png16, png32, png48]);
  fs.writeFileSync(path.join(appDir, "favicon.ico"), ico);
  console.log("Wrote app/icon.png and app/favicon.ico");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
