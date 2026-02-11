import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';

const GALLERY_SRC = 'public/images/gallery';
const THUMB_DIR = 'public/images/gallery/thumbs';
const FULL_DIR = 'public/images/gallery/full';

const THUMB_SIZE = 400;
const FULL_SIZE = 1200;
const WEBP_QUALITY = 80;

async function optimizeImages() {
  // Create output directories
  await mkdir(THUMB_DIR, { recursive: true });
  await mkdir(FULL_DIR, { recursive: true });

  const files = await readdir(GALLERY_SRC);
  const images = files.filter(f =>
    /\.(jpg|jpeg|png)$/i.test(f) && !f.startsWith('.')
  );

  console.log(`Found ${images.length} images to optimize\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of images) {
    const inputPath = join(GALLERY_SRC, file);
    const name = parse(file).name;

    const thumbPath = join(THUMB_DIR, `${name}.webp`);
    const fullPath = join(FULL_DIR, `${name}.webp`);

    try {
      const input = sharp(inputPath);
      const metadata = await input.metadata();
      const originalSize = metadata.size || 0;
      totalOriginal += originalSize;

      // Generate thumbnail
      const thumbInfo = await sharp(inputPath)
        .resize(THUMB_SIZE, THUMB_SIZE, { fit: 'cover' })
        .webp({ quality: WEBP_QUALITY })
        .toFile(thumbPath);

      // Generate full-size
      const fullInfo = await sharp(inputPath)
        .resize(FULL_SIZE, FULL_SIZE, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(fullPath);

      totalOptimized += thumbInfo.size + fullInfo.size;

      const savings = ((1 - (thumbInfo.size + fullInfo.size) / originalSize) * 100).toFixed(0);
      console.log(`✓ ${file} → thumb: ${(thumbInfo.size / 1024).toFixed(0)}KB, full: ${(fullInfo.size / 1024).toFixed(0)}KB (${savings}% saved)`);
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
    }
  }

  console.log('\n─────────────────────────────────');
  console.log(`Original total:  ${(totalOriginal / 1024 / 1024).toFixed(1)}MB`);
  console.log(`Optimized total: ${(totalOptimized / 1024 / 1024).toFixed(1)}MB`);
  console.log(`Savings:         ${((1 - totalOptimized / totalOriginal) * 100).toFixed(0)}%`);
}

optimizeImages();
