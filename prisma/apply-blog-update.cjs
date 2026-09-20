const { PrismaClient } = require('@prisma/client');
const fs = require('node:fs');
const prisma = new PrismaClient();
async function main() {
  const before = await prisma.blogPost.count();
  const statements = fs.readFileSync('prisma/blog-update.sql','utf8').replace(/^--.*$/gm, '').split(';').map(s => s.trim()).filter(Boolean);
  await prisma.$transaction(statements.map(s => prisma.$executeRawUnsafe(s)));
  console.log('Additive blog schema update complete. Existing post count:', before);
}
main().catch(e => { console.error('Database update failed:', e.code || e.name); process.exitCode = 1; }).finally(() => prisma.$disconnect());

