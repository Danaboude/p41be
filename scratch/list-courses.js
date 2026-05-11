const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function list() {
  try {
    const courses = await prisma.course.findMany({ select: { title: true } });
    console.log('COURSES:' + JSON.stringify(courses));
  } catch (e) {
    console.error('DB_ERROR:' + e.message);
  } finally {
    await prisma.$disconnect();
  }
}

list();
