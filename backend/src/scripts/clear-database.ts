import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
  console.log('Clearing database...');
  
  // Delete in order to respect foreign key constraints
  await prisma.comment.deleteMany();
  await prisma.tagsOnPosts.deleteMany();
  await prisma.post.deleteMany();
  await prisma.committeeMember.deleteMany();
  await prisma.committee.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  
  console.log('Database cleared!');
}

async function main() {
  try {
    await clearDatabase();
  } catch (error) {
    console.error('Error clearing database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
