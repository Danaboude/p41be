// Safe to rerun: existing posts (including admin edits) are never overwritten.
// Relative ages in post.md are anchored to 2026-09-19. Day 1 is only a sorting key;
// dateApproximate ensures the public UI displays a month, never an invented day.
const { PrismaClient } = require('@prisma/client');
const posts = require('./linkedin-posts.json');
const prisma = new PrismaClient();
async function main() {
  for (const post of posts) {
    await prisma.blogPost.upsert({ where: { slug: post.slug }, create: post, update: {} });
    console.log(`Ensured post: ${post.slug}`);
  }
}
main().catch(() => { console.error('LinkedIn seed failed. Check the database connection and apply prisma/blog-update.sql first.'); process.exitCode = 1; }).finally(() => prisma.$disconnect());
