import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.course.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin User
  const passwordHash = await bcrypt.hash('ives-abdulkareem', 10);
  await prisma.user.create({
    data: {
      email: 'ives@p41.be',
      passwordHash: passwordHash
    }
  });

  // Sample Courses with RICH CONTENT
  const courses = [
    {
      title: 'Lean Manufacturing 4.0',
      subtitle: 'From Classic Lean to Digital Lean',
      description: 'Master the evolution of Lean principles in the era of Industry 4.0.',
      longDescription: [
        'This comprehensive program bridges the gap between traditional Lean Manufacturing and the digital revolution sweeping through modern industry. You will learn how the foundational principles established by Toyota have evolved to incorporate IoT sensors, machine learning, and real-time analytics.',
        'Every module is built around real factory data from our consulting projects. You won\'t just learn theory — you\'ll analyze actual production lines, identify waste using both traditional Gemba walks and digital dashboards, and design improvement strategies that leverage the full power of connected manufacturing.',
        'By the end of this course, you will have a complete digital Lean toolkit and the confidence to lead transformation projects in any industrial setting.'
      ],
      image: 'CrossRoads-22-1-scaled-1.jpg',
      duration: '8 weeks',
      level: 'Intermediate',
      modules: [
        { title: 'The Evolution of Lean: From TPS to Industry 4.0', duration: '45 min', description: 'Trace the journey from Toyota Production System to smart factories.' },
        { title: 'Value Stream Mapping in Connected Factories', duration: '60 min', description: 'Learn to create value stream maps that incorporate data flows.' },
        { title: 'Digital Waste Identification', duration: '55 min', description: 'Discover how real-time data reveals hidden waste patterns.' }
      ],
      price: '€1,490',
      isPaid: true,
      tags: ['Lean', 'Industry 4.0', 'IoT'],
      instructor: 'Ives De Saeger',
      rating: 4.9,
      students: 342,
      whatYouLearn: [
        'Apply Lean principles in digitally connected factory environments',
        'Create data-driven Value Stream Maps using IoT sensor data',
        'Design smart pull systems and digital visual management boards'
      ],
      prerequisites: [
        'Basic understanding of manufacturing processes',
        'Familiarity with Lean fundamentals (helpful but not required)'
      ]
    },
    {
      title: 'Time Study Mastery',
      subtitle: 'MTM-UAS & Predetermined Time Systems',
      description: 'Deep dive into predetermined time study methods including MTM-UAS.',
      longDescription: [
        'This advanced course takes you deep into the science of work measurement. Beginning with the pioneering work of Frank and Lillian Gilbreth, you\'ll trace the evolution of time study from film cameras to digital video analysis.'
      ],
      image: 'CrossRoads-29-scaled.jpg',
      duration: '6 weeks',
      level: 'Advanced',
      modules: [
        { title: 'History of Time Study', duration: '50 min', description: 'The history of motion study and predetermined time systems.' },
        { title: 'MTM-1 Fundamentals', duration: '70 min', description: 'Master the basic motions of MTM-1.' }
      ],
      price: '€1,290',
      isPaid: true,
      tags: ['Time Study', 'MTM-UAS', 'Ergonomics'],
      instructor: 'Ives De Saeger',
      rating: 4.8,
      students: 218,
      whatYouLearn: [
        'Master MTM-1, MTM-UAS, MOST and Modapts',
        'Conduct professional video-based motion analysis'
      ],
      prerequisites: ['Basic understanding of manufacturing processes']
    }
  ];

  for (const course of courses) {
    await prisma.course.create({ data: course });
  }

  // Sample Blog Posts
  const blogPosts = [
    {
      title: 'Getting back to basics',
      excerpt: 'We are looking at the year 1910. More than 113 years ago! A brilliant analyst called Frank B Gilbreth started using film cameras...',
      content: ['In 1910, factory management was revolutionized...', 'Frank Gilbreth discovered that waste could be identified through visual study...'],
      image: 'blog1.png',
      date: 'Jan 2, 2023',
      readTime: '5 min read',
      tags: ['History', 'Efficiency']
    }
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
