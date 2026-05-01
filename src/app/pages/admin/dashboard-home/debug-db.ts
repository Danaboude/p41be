import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const courses = await prisma.course.findMany({
    select: { id: true, title: true }
  });
  const purchases = await prisma.purchase.findMany({
    take: 5,
    select: { id: true, courseId: true }
  });
  console.log('Courses:', JSON.stringify(courses, null, 2));
  console.log('Purchases:', JSON.stringify(purchases, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
