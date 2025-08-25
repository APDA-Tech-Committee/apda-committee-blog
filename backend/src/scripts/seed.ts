import { PrismaClient } from '@prisma/client';
import { seedTechTeam } from './seed-tech-team';
import { seedTechPosts } from './seed-tech-posts';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting database seeding...');
    
    // Clear existing data to avoid conflicts
    await clearDatabase();
    
    // Seed tech team information
    await seedTechTeam();
    
    // Seed tech blog posts
    await seedTechPosts();
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Optional: Function to clear existing data
async function clearDatabase() {
  console.log('Clearing existing database data...');
  
  // Delete in order to respect foreign key constraints
  await prisma.tagsOnPosts.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.techTeam.deleteMany();
  await prisma.user.deleteMany();
  
  console.log('Database cleared successfully.');
}

// Execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
