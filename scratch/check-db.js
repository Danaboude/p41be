const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const count = await prisma.course.count();
    console.log('COURSE_COUNT:' + count);
  } catch (e) {
    console.error('DB_ERROR:' + e.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
