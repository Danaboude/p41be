// Report 4.2: exact, repeatable correction; preserves the original publication date.
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const social = await prisma.blogPost.findUnique({ where: { slug: 'what-should-we-automate' } });
  if (social?.content.some(p => p.includes('History repeatsitself'))) await prisma.blogPost.update({ where: { id: social.id }, data: { content: social.content.map(p => p.replace('History repeatsitself', 'History repeats itself')) } });
  const summaries = {
    'getting-back-to-basics': 'What early motion studies can still teach us about reducing wasted movement, improving flow and measuring work on the shop floor.',
    'where-should-companies-focus-on-to-stay-competitive': 'People, capacity, stock or waste: where should improvement start? A practical look at choosing priorities that create customer value.',
    'why-doing-a-lot-of-improvements-in-your-company-might-work-against-you': 'More improvement projects do not always mean better results. Explore common pitfalls and ways to focus on customer value, return and trust.'
  };
  for (const [slug, excerpt] of Object.entries(summaries)) {
    const article = await prisma.blogPost.findUnique({ where: { slug } });
    if (article && article.excerpt.length > 400) await prisma.blogPost.update({ where: { id: article.id }, data: { excerpt } });
  }
  const post = await prisma.blogPost.findUnique({ where: { slug: 'getting-back-to-basics' } });
  if (!post) return;
  const oldText = 'By applying you can quickly improve from 10 to 30%.';
  const newText = 'At P41, we use time study and error analysis to identify at least 10% efficiency gains within 3 months, with an investment payback period under one year.';
  if (!post.content.some(p => p.includes(oldText))) { console.log('Article claim already aligned.'); return; }
  await prisma.blogPost.update({ where: { id: post.id }, data: { content: post.content.map(p => p.replace(oldText, newText)) } });
  console.log('Aligned the efficiency claim; preserved the article publication date.');
}
main().catch(() => { console.error('Article update failed.'); process.exitCode = 1; }).finally(() => prisma.$disconnect());
