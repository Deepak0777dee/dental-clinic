import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, basename, extname } from 'path';

const srcDir = 'C:\\Users\\D-ROCK\\.gemini\\antigravity-ide\\brain\\38f375bb-4f73-4a56-b6c8-465be0bd3fbc';
const dstDir = 'c:\\Users\\D-ROCK\\Desktop\\dental clinic\\images';

const files = readdirSync(srcDir).filter(f => f.endsWith('.jpg'));

for (const file of files) {
  const src = join(srcDir, file);
  // Remove the timestamp suffix from filename
  const name = file.replace(/_\d+\.jpg$/, '.webp');
  const dst = join(dstDir, name);
  
  let quality = 75;
  let size = Infinity;
  
  // Try reducing quality until under 100KB
  while (quality > 10 && size > 100000) {
    const buf = await sharp(src)
      .webp({ quality })
      .toBuffer();
    size = buf.length;
    
    if (size <= 100000) {
      await sharp(src)
        .webp({ quality })
        .toFile(dst);
      console.log(`✓ ${name} - ${(size/1024).toFixed(1)}KB (q=${quality})`);
      break;
    }
    quality -= 5;
  }
  
  if (size > 100000) {
    // Resize and compress
    await sharp(src)
      .resize(800)
      .webp({ quality: 50 })
      .toFile(dst);
    const finalSize = statSync(dst).size;
    console.log(`✓ ${name} - ${(finalSize/1024).toFixed(1)}KB (resized+q=50)`);
  }
}

console.log('Done converting all images!');
