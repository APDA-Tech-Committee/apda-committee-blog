import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedTechTeam() {
  console.log('Seeding tech team information...');

  const techTeam = {
    description: 'The APDA Tech Committee is responsible for managing technology infrastructure, developing tools, and providing technical solutions for the American Parliamentary Debate Association.',
    mission: 'To leverage technology to improve the debate experience, expand access to parliamentary debate, and streamline operations for APDA.',
    contact: 'tech@apdadebate.org'
  };
  
  const createdTeam = await prisma.techTeam.upsert({
    where: { id: 'default' },
    update: techTeam,
    create: {
      ...techTeam,
      id: 'default'
    }
  });

  console.log(`Tech team information created/updated: ${createdTeam.id}`);
  console.log('Tech team seeding completed!');
}

// For direct execution of this script
// Check if this module is being run directly
if (process.argv[1] === import.meta.url) {
  (async () => {
    try {
      await seedTechTeam();
    } catch (error) {
      console.error('Error seeding tech team data:', error);
      process.exit(1);
    } finally {
      await prisma.$disconnect();
    }
  })();
}
