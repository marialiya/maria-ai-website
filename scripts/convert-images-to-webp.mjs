import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const IMAGE_DIR = path.join(ROOT, 'public', 'image');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const files = await walk(IMAGE_DIR);
  const pngFiles = files.filter((f) => f.toLowerCase().endsWith('.png'));

  let converted = 0;
  for (const png of pngFiles) {
    const webp = png.replace(/\.png$/i, '.webp');
    try {
      await fs.access(webp);
      continue;
    } catch {
      // noop
    }
    await sharp(png).webp({ quality: 82 }).toFile(webp);
    converted += 1;
  }

  console.log(`Converted ${converted} PNG files to WebP.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
