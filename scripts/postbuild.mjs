// Copy the prerendered 404 page to /404.html so Vercel serves it with a real 404 status.
import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const out = process.argv[2] || 'dist/p41.be/browser';
const src = join(out, '404', 'index.html');
if (!existsSync(src)) {
  console.error(`postbuild: ${src} not found`);
  process.exit(1);
}
copyFileSync(src, join(out, '404.html'));
console.log('postbuild: wrote', join(out, '404.html'));
