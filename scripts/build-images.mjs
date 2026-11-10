// Builds optimized portrait assets and social share images.
// If pic1.jpeg and pic.png exist in the project root, they are composited.
// Otherwise, public/assets/portrait-background.png is used as the source portrait.
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';

const OUT = 'public/assets';
mkdirSync(OUT, { recursive: true });

let cutout;

if (existsSync('pic1.jpeg') && existsSync('pic.png')) {
  const hi = sharp('pic1.jpeg');
  const { width, height } = await hi.metadata();
  if (!width || !height) throw new Error('Invalid metadata for pic1.jpeg');

  const alpha = await sharp('pic.png')
    .ensureAlpha()
    .extractChannel('alpha')
    .resize(width, height, { kernel: 'lanczos3' })
    .blur(0.8)
    .raw()
    .toBuffer();

  const rgb = await sharp('pic1.jpeg').removeAlpha().raw().toBuffer();
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    rgba[i * 4] = rgb[i * 3];
    rgba[i * 4 + 1] = rgb[i * 3 + 1];
    rgba[i * 4 + 2] = rgb[i * 3 + 2];
    rgba[i * 4 + 3] = alpha[i];
  }
  cutout = await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toBuffer();
} else if (existsSync(`${OUT}/portrait-background.png`)) {
  cutout = await sharp(`${OUT}/portrait-background.png`).png().toBuffer();
} else {
  // Fallback transparent 1x1 buffer
  cutout = await sharp({ create: { width: 1, height: 1, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).png().toBuffer();
}

for (const w of [1100, 720, 420]) {
  await sharp(cutout).resize({ width: w }).webp({ quality: 86, alphaQuality: 90 }).toFile(`${OUT}/portrait-${w}.webp`);
}

// Social share image (1200x630) on a dark backdrop
const portrait = await sharp(cutout).resize({ height: 600 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#07070a' } })
  .composite([
    {
      input: Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs><radialGradient id="g" cx="78%" cy="45%" r="45%"><stop offset="0" stop-color="#e5132b" stop-opacity="0.45"/><stop offset="1" stop-color="#e5132b" stop-opacity="0"/></radialGradient></defs>
        <rect width="1200" height="630" fill="url(#g)"/>
      </svg>`),
    },
    { input: portrait, gravity: 'southeast' },
    {
      input: Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <text x="72" y="300" font-family="Impact, 'Arial Narrow', sans-serif" font-size="110" fill="#f4f1ec" letter-spacing="4">SAI INAPAKOLLA</text>
        <text x="78" y="352" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="26" fill="#ff3d5a" letter-spacing="16">THE SERIES</text>
        <text x="78" y="410" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="18" fill="#a7a6ad" letter-spacing="5">Full Stack Developer | Java &amp; Spring Boot</text>
        <text x="78" y="440" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="18" fill="#a7a6ad" letter-spacing="5">Backend Architecture | Machine Learning</text>
      </svg>`),
    },
  ])
  .jpeg({ quality: 85 })
  .toFile(`${OUT}/og-image.jpg`);

console.log('images built successfully');
