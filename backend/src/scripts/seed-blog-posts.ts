import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedBlogPosts() {
  console.log('Seeding blog posts...');

  // Get all committees and categories
  const committees = await prisma.committee.findMany();
  const categories = await prisma.category.findMany();
  
  // Create categories if they don't exist
  const announcementCategory = await prisma.category.upsert({
    where: { slug: 'announcement' },
    update: {},
    create: {
      name: 'Announcement',
      slug: 'announcement',
      description: 'Official announcements from APDA',
      color: '#3B82F6'
    }
  });

  const educationCategory = await prisma.category.upsert({
    where: { slug: 'education' },
    update: {},
    create: {
      name: 'Education',
      slug: 'education',
      description: 'Educational content and resources',
      color: '#10B981'
    }
  });

  const newsCategory = await prisma.category.upsert({
    where: { slug: 'news' },
    update: {},
    create: {
      name: 'News',
      slug: 'news',
      description: 'Latest news and updates',
      color: '#F59E0B'
    }
  });

  // Create authors for each committee
  const techCommitteeAuthor = await prisma.user.upsert({
    where: { email: 'tech@apda.org' },
    update: {},
    create: {
      email: 'tech@apda.org',
      name: 'Tech Committee',
      password: 'hashedpassword',
      role: 'EDITOR'
    }
  });

  const gseiAuthor = await prisma.user.upsert({
    where: { email: 'gsei@apda.org' },
    update: {},
    create: {
      email: 'gsei@apda.org',
      name: 'GSEI Committee',
      password: 'hashedpassword',
      role: 'EDITOR'
    }
  });

  const eofAuthor = await prisma.user.upsert({
    where: { email: 'eof@apda.org' },
    update: {},
    create: {
      email: 'eof@apda.org',
      name: 'Equal Opportunity Facilitators',
      password: 'hashedpassword',
      role: 'EDITOR'
    }
  });

  const expansionAuthor = await prisma.user.upsert({
    where: { email: 'expansion@apda.org' },
    update: {},
    create: {
      email: 'expansion@apda.org',
      name: 'Expansion Committee',
      password: 'hashedpassword',
      role: 'EDITOR'
    }
  });

  const diversityAuthor = await prisma.user.upsert({
    where: { email: 'diversity@apda.org' },
    update: {},
    create: {
      email: 'diversity@apda.org',
      name: 'Diversity Initiative',
      password: 'hashedpassword',
      role: 'EDITOR'
    }
  });

  const vrcAuthor = await prisma.user.upsert({
    where: { email: 'video@apda.org' },
    update: {},
    create: {
      email: 'video@apda.org',
      name: 'Video Recording Committee',
      password: 'hashedpassword',
      role: 'EDITOR'
    }
  });

  const mentorAuthor = await prisma.user.upsert({
    where: { email: 'mentors@apda.org' },
    update: {},
    create: {
      email: 'mentors@apda.org',
      name: 'Novice Mentor Committee',
      password: 'hashedpassword',
      role: 'EDITOR'
    }
  });

  const historyAuthor = await prisma.user.upsert({
    where: { email: 'history@apda.org' },
    update: {},
    create: {
      email: 'history@apda.org',
      name: 'History Committee',
      password: 'hashedpassword',
      role: 'EDITOR'
    }
  });

  // Sample posts for each committee
  const samplePosts = [
    // Tech Committee
    {
      title: 'Introducing Our New Digital Platform',
      slug: 'introducing-new-digital-platform',
      excerpt: 'We\'re excited to announce the launch of our new committee management and blog platform, designed to enhance communication and collaboration across APDA.',
      content: 'Today marks a significant milestone for the American Parliamentary Debate Association as we unveil our brand new digital platform. This comprehensive system has been developed by our Tech Committee to streamline committee operations, improve member communication, and provide a centralized hub for all APDA activities.\n\nThe platform features include:\n- Individual committee pages with member information\n- Integrated blog system for news and updates\n- Enhanced committee collaboration tools\n- Mobile-responsive design for accessibility\n\nWe believe this platform will significantly improve how our committees operate and how members stay informed about APDA activities.',
      status: 'PUBLISHED',
      publishedAt: new Date('2025-08-18'),
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      categoryId: announcementCategory.id,
      authorId: techCommitteeAuthor.id,
      committeeSlug: 'tech-committee'
    },
    // Gender and Sexuality Empowerment Initiative
    {
      title: 'Creating Inclusive Debate Spaces',
      slug: 'creating-inclusive-debate-spaces',
      excerpt: 'Our committee is working to ensure that all debaters, regardless of gender identity or sexual orientation, feel welcome and supported in APDA competitions.',
      content: 'The Gender and Sexuality Empowerment Initiative is committed to fostering an inclusive environment where all debaters can thrive. We recognize that creating truly welcoming spaces requires ongoing effort and attention.\n\nOur recent initiatives include:\n- Developing inclusive language guidelines for debate competitions\n- Providing training for judges and tournament organizers\n- Creating mentorship programs for LGBTQ+ debaters\n- Establishing reporting mechanisms for discrimination\n\nWe believe that diversity strengthens our debate community and enriches the educational experience for everyone involved.',
      status: 'PUBLISHED',
      publishedAt: new Date('2025-08-17'),
      featuredImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      categoryId: educationCategory.id,
      authorId: gseiAuthor.id,
      committeeSlug: 'gender-sexuality-empowerment'
    },
    // Equal Opportunity Facilitators
    {
      title: 'Breaking Down Barriers in Debate',
      slug: 'breaking-down-barriers-debate',
      excerpt: 'Working to identify and eliminate barriers that prevent equal participation in parliamentary debate across all backgrounds and circumstances.',
      content: 'The Equal Opportunity Facilitators committee is dedicated to ensuring that parliamentary debate is accessible to all students, regardless of their background, financial situation, or personal circumstances.\n\nOur current focus areas include:\n- Financial assistance programs for tournament participation\n- Transportation support for teams in rural areas\n- Equipment lending programs for emerging debate programs\n- Partnerships with educational institutions to expand access\n\nWe believe that talent and passion for debate should be the only requirements for participation, not financial means or geographic location.',
      status: 'PUBLISHED',
      publishedAt: new Date('2025-08-16'),
      featuredImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      categoryId: newsCategory.id,
      authorId: eofAuthor.id,
      committeeSlug: 'equal-opportunity-facilitators'
    },
    // Expansion Committee
    {
      title: 'APDA Growth Initiative: New Programs Launching',
      slug: 'apda-growth-initiative-new-programs',
      excerpt: 'Our expansion efforts are bearing fruit with new debate programs launching at universities across the country.',
      content: 'The Expansion Committee is pleased to report significant progress in growing the APDA community. This semester, we\'ve successfully established new debate programs at five universities and are in talks with ten more institutions.\n\nHighlights from our expansion efforts:\n- New programs at Midwest State University and Pacific Coast College\n- Successful coaching workshops conducted at three institutions\n- Resource packages delivered to emerging programs\n- Mentorship partnerships established between new and established teams\n\nOur goal is to make parliamentary debate accessible to students nationwide, and these new programs represent important steps toward that vision.',
      status: 'PUBLISHED',
      publishedAt: new Date('2025-08-15'),
      featuredImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      categoryId: newsCategory.id,
      authorId: expansionAuthor.id,
      committeeSlug: 'expansion-committee'
    },
    // Diversity Initiative
    {
      title: 'Celebrating Diversity in Parliamentary Debate',
      slug: 'celebrating-diversity-parliamentary-debate',
      excerpt: 'Our commitment to diversity makes our debate community stronger and more representative of the students we serve.',
      content: 'The Diversity Initiative recognizes that our debate community is strongest when it reflects the full diversity of higher education. We\'re committed to creating pathways for underrepresented students to participate and excel in parliamentary debate.\n\nRecent initiatives include:\n- Scholarship programs for underrepresented students\n- Mentorship networks connecting diverse debaters\n- Cultural competency training for judges and coaches\n- Partnerships with minority-serving institutions\n\nDiversity isn\'t just about representation—it\'s about ensuring that all voices are heard and valued in our debates and our community.',
      status: 'PUBLISHED',
      publishedAt: new Date('2025-08-14'),
      featuredImage: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      categoryId: educationCategory.id,
      authorId: diversityAuthor.id,
      committeeSlug: 'diversity-initiative'
    },
    // Video Recording Committee
    {
      title: 'Preserving Great Debates for Future Generations',
      slug: 'preserving-great-debates-future-generations',
      excerpt: 'Our video recording efforts are creating a valuable archive of exceptional debates while providing learning resources for current and future debaters.',
      content: 'The Video Recording Committee has been working diligently to capture and preserve the best of parliamentary debate. Our video archive serves both as a historical record and as an educational resource for debaters looking to improve their skills.\n\nOur video library now includes:\n- Final rounds from major tournaments\n- Educational workshops and training sessions\n- Masterclasses from champion debaters\n- Judging clinics and feedback sessions\n\nThese recordings are available to all APDA members and serve as invaluable learning tools. We\'re particularly excited about our new series featuring debates on contemporary issues.',
      status: 'PUBLISHED',
      publishedAt: new Date('2025-08-13'),
      featuredImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      categoryId: newsCategory.id,
      authorId: vrcAuthor.id,
      committeeSlug: 'video-recording-committee'
    },
    // Novice Mentor Committee
    {
      title: 'Supporting New Debaters: Mentorship That Works',
      slug: 'supporting-new-debaters-mentorship-works',
      excerpt: 'Our mentorship program pairs experienced debaters with newcomers, creating supportive relationships that help novices thrive in parliamentary debate.',
      content: 'The Novice Mentor Committee believes that every great debater started as a beginner, and that with proper support and guidance, any motivated student can excel in parliamentary debate.\n\nOur mentorship program features:\n- One-on-one pairing of novice and experienced debaters\n- Structured curriculum covering debate fundamentals\n- Regular check-ins and progress assessments\n- Group workshops and practice sessions\n- Support for both academic and competitive debate\n\nWe\'ve seen remarkable progress from our mentees, with many going on to achieve success at regional and national tournaments. The relationships formed through our program often last well beyond the formal mentorship period.',
      status: 'PUBLISHED',
      publishedAt: new Date('2025-08-12'),
      featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      categoryId: educationCategory.id,
      authorId: mentorAuthor.id,
      committeeSlug: 'novice-mentor-committee'
    },
    // History Committee
    {
      title: 'Preserving APDA\'s Rich Heritage',
      slug: 'preserving-apda-rich-heritage',
      excerpt: 'The History Committee is working to document and preserve the stories, traditions, and evolution of the American Parliamentary Debate Association.',
      content: 'The History Committee serves as the guardian of APDA\'s institutional memory, working to preserve and share the rich history of our organization and the parliamentary debate community.\n\nOur current projects include:\n- Digitizing historical tournament records and results\n- Conducting oral history interviews with APDA legends\n- Creating timeline exhibits of key moments in APDA history\n- Developing educational materials about debate evolution\n\nWe believe that understanding our history helps us appreciate how far we\'ve come and informs our decisions about where we\'re going. The stories of past champions, innovative tournaments, and community growth inspire today\'s debaters and leaders.',
      status: 'PUBLISHED',
      publishedAt: new Date('2025-08-11'),
      featuredImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      categoryId: educationCategory.id,
      authorId: historyAuthor.id,
      committeeSlug: 'history-committee'
    }
  ];

  for (const postData of samplePosts) {
    const { committeeSlug, ...post } = postData;
    
    // Find the committee
    const committee = committees.find((c: any) => c.slug === committeeSlug);
    
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: {
        ...post,
        committeeId: committee?.id
      }
    });
    
    console.log(`Created/Updated post: ${post.title}`);
  }

  console.log('Blog post seeding completed!');
}

async function main() {
  try {
    await seedBlogPosts();
  } catch (error) {
    console.error('Error seeding blog posts:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
