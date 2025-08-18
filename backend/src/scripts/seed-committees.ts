import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const committees = [
  {
    name: 'Gender and Sexuality Empowerment Initiative',
    slug: 'gender-sexuality-empowerment',
    description: 'Promoting inclusivity and equality in parliamentary debate through gender and sexuality awareness.',
    mission: 'To create a more inclusive debate environment that welcomes and supports debaters of all gender identities and sexual orientations.',
    contact: 'example@email.com',
    members: [
      {
        name: 'Cecilia Granda-Scott',
        role: 'Chair',
        bio: 'Debate leader from Amherst College with a passion for inclusive debate practices.',
        email: 'example@email.com',
        order: 1
      },
    ]
  },
  {
    name: 'Equal Opportunity Facilitators',
    slug: 'equal-opportunity-facilitators',
    description: 'Ensuring fair access and opportunities for all debaters regardless of background.',
    mission: 'To identify and remove barriers that prevent equal participation in parliamentary debate.',
    contact: 'example@email.com',
    members: [
      {
        name: 'Sahil Sud',
        role: 'Chair',
        bio: 'Debate leader from Georgetown University advocating for accessibility and equal opportunities.',
        email: 'example@email.com',
        order: 1
      },
      {
        name: 'Sydney Cook',
        role: 'Board Liaison',
        bio: 'Board liaison from University of Chicago working to ensure equal opportunities in debate.',
        email: 'example@email.com',
        order: 2
      }
    ]
  },
  {
    name: 'Tech Committee',
    slug: 'tech-committee',
    description: 'Managing technology infrastructure and digital innovation for APDA.',
    mission: 'To leverage technology to improve the debate experience and expand access to parliamentary debate.',
    contact: 'example@email.com',
    members: [
      {
        name: 'Joey Rubas',
        role: 'Chair',
        bio: 'Computer Science major and experienced debater focused on debate technology.',
        email: 'example@email.com',
        order: 1
      },
      {
        name: 'Riley Johnson',
        role: 'Vice-Chair',
        bio: 'Full-stack developer passionate about improving debate accessibility through technology.',
        email: 'example@email.com',
        order: 2
      }
    ]
  },
  {
    name: 'Expansion Committee',
    slug: 'expansion-committee',
    description: 'Growing parliamentary debate by establishing new programs and partnerships.',
    mission: 'To expand APDA membership and establish new debate programs at colleges and universities.',
    contact: 'example@email.com',
    members: [
      {
        name: 'Raina Batra',
        role: 'Board Liaison',
        bio: 'Board liaison from Amherst College working to expand debate programs nationwide.',
        email: 'example@email.com',
        order: 1
      }
    ]
  },
  {
    name: 'Diversity Initiative',
    slug: 'diversity-initiative',
    description: 'Promoting diversity and inclusion across all aspects of parliamentary debate.',
    mission: 'To increase participation from underrepresented communities and create a welcoming environment for all debaters.',
    contact: 'example@email.com',
    members: [
      {
        name: 'Yuki Nakano',
        role: 'Board Liaison',
        bio: 'Board liaison from George Washington University committed to diversity and inclusive practices.',
        email: 'example@email.com',
        order: 1
      }
    ]
  },
  {
    name: 'Video Recording Committee',
    slug: 'video-recording-committee',
    description: 'Documenting debates and creating educational content for the community.',
    mission: 'To preserve important debates and create learning resources through high-quality video content.',
    contact: 'example@email.com',
    members: [
      {
        name: 'Naz Soysal',
        role: 'Board Liaison',
        bio: 'Board liaison focused on creating engaging video content and preserving debate history.',
        email: 'example@email.com',
        order: 1
      }
    ]
  },
  {
    name: 'Novice Mentor Committee',
    slug: 'novice-mentor-committee',
    description: 'Supporting new debaters through mentorship and educational programs.',
    mission: 'To help novice debaters develop their skills and integrate into the APDA community.',
    contact: 'example@email.com',
    members: [
      {
        name: 'Pranav Garigapati',
        role: 'Chair',
        bio: 'Chair from Rutgers University passionate about developing new debate talent.',
        email: 'example@email.com',
        order: 1
      },
      {
        name: 'Rohan Sachdev',
        role: 'Board Liaison',
        bio: 'Board liaison from University of Chicago focused on novice mentorship programs.',
        email: 'example@email.com',
        order: 2
      }
    ]
  },
  {
    name: 'History Committee',
    slug: 'history-committee',
    description: 'Preserving and documenting the rich history of APDA and parliamentary debate.',
    mission: 'To maintain historical records and share the stories that shaped our debate community.',
    contact: 'example@email.com',
    members: [
      {
        name: 'Cecilia Granda-Scott',
        role: 'Chair',
        bio: 'Dedicated to preserving our league\'s history.',
        email: 'example@email.com',
        order: 1
      }
    ]
  }
];

async function seedCommittees() {
  console.log('Seeding committees...');

  for (const committeeData of committees) {
    const { members, ...committee } = committeeData;
    
    const createdCommittee = await prisma.committee.upsert({
      where: { slug: committee.slug },
      update: committee,
      create: committee
    });

    console.log(`Created/Updated committee: ${createdCommittee.name}`);

    // Create members
    for (const memberData of members) {
      await prisma.committeeMember.upsert({
        where: {
          committeeId_name: {
            committeeId: createdCommittee.id,
            name: memberData.name
          }
        },
        update: memberData,
        create: {
          ...memberData,
          committeeId: createdCommittee.id
        }
      });
    }
  }

  console.log('Committee seeding completed!');
}

async function main() {
  try {
    await seedCommittees();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
