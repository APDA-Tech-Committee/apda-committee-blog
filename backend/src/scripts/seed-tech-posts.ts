import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

const categories = [
  {
    name: 'Projects',
    slug: 'projects',
    description: 'Tech projects developed by the APDA Tech Committee',
    color: '#3B82F6', // blue
  },
  {
    name: 'Tutorials',
    slug: 'tutorials',
    description: 'Technical tutorials and guides for APDA members',
    color: '#10B981', // green
  },
  {
    name: 'Updates',
    slug: 'updates',
    description: 'Updates on Tech Committee activities and initiatives',
    color: '#8B5CF6', // purple
  }
];

const tags = [
  { name: 'Web Development', slug: 'web-development' },
  { name: 'Database', slug: 'database' },
  { name: 'API', slug: 'api' },
  { name: 'Frontend', slug: 'frontend' },
  { name: 'Backend', slug: 'backend' },
  { name: 'DevOps', slug: 'devops' },
  { name: 'Mobile', slug: 'mobile' },
  { name: 'UI/UX', slug: 'ui-ux' },
  { name: 'Open Source', slug: 'open-source' }
];

export async function seedTechPosts() {
  console.log('Starting to seed tech blog posts...');

  // Create a default admin user if none exists
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@apdatech.org' },
    update: {},
    create: {
      email: 'admin@apdatech.org',
      name: 'Tech Admin',
      password: '$2b$10$EprUaU3/McNrr.Wm3QdpJ.qOTL/Y3aQvAp7lZJJaLZX2TqrIwC2nK', // 'password123' - in production use proper hashing
      role: 'ADMIN',
      bio: 'Administrator of the APDA Tech Committee blog',
      position: 'Tech Committee Chair'
    }
  });

  // Create categories
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category
    });
  }

  // Create tags
  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: tag,
      create: tag
    });
  }

  // Get created categories and tags
  const createdCategories = await prisma.category.findMany();
  const createdTags = await prisma.tag.findMany();

  // Sample blog posts
  const posts = [
    {
      title: 'Introducing the New Tournament Management System',
      slug: 'introducing-new-tournament-management-system',
      excerpt: 'We are excited to announce our new tournament management system designed specifically for APDA tournaments.',
      content: `
# Introducing the New Tournament Management System

We are excited to announce our new tournament management system designed specifically for APDA tournaments. This system streamlines the process of registering for tournaments, managing team information, and tracking results.

## Key Features

- Easy registration process for teams
- Automated pairing system
- Real-time results updates
- Judge allocation optimization
- Mobile-friendly interface

## Technical Implementation

The system is built using a modern tech stack:

- Frontend: Vue.js with TypeScript
- Backend: Node.js with Express
- Database: PostgreSQL
- Hosting: Google Cloud Platform

## Next Steps

We are currently in beta testing with select tournaments. If you are interested in using the system for your tournament, please contact us at tech@apdadebate.org.

We welcome feedback and feature suggestions as we continue to improve the system.
      `,
      status: 'PUBLISHED',
      featuredImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      publishedAt: new Date(2025, 7, 1), // August 1, 2025
      categoryId: createdCategories.find(c => c.slug === 'projects')?.id || '',
      authorId: adminUser.id,
      projectUrl: 'https://tournaments.apdadebate.org',
      githubUrl: 'https://github.com/APDA-Tech-Committee/tournament-system',
      tags: ['web-development', 'database', 'frontend', 'backend']
    },
    {
      title: 'How to Use the APDA API for Custom Applications',
      slug: 'how-to-use-apda-api',
      excerpt: 'Learn how to use our public API to build custom applications and integrations with APDA data.',
      content: `
# How to Use the APDA API for Custom Applications

The APDA API provides access to tournament data, team information, and historical results. This tutorial will guide you through setting up and using our API for your own applications.

## API Overview

The APDA API is a RESTful service that returns JSON data. It is available at \`https://api.apdadebate.org/v1\`.

## Authentication

To use the API, you will need an API key. You can request one by emailing tech@apdadebate.org.

## Example Endpoints

- \`/tournaments\` - List all tournaments
- \`/tournaments/{id}\` - Get details for a specific tournament
- \`/teams\` - List all teams
- \`/teams/{id}\` - Get details for a specific team

## Code Example

Here is a simple JavaScript example to fetch tournament data:

\`\`\`javascript
async function fetchTournaments() {
  const response = await fetch('https://api.apdadebate.org/v1/tournaments', {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  });
  
  const data = await response.json();
  console.log(data);
}
\`\`\`

## Rate Limits

Please note that the API has a rate limit of 100 requests per hour per API key.

## Support

If you have questions or run into issues, please contact us at tech@apdadebate.org.
      `,
      status: 'PUBLISHED',
      featuredImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      publishedAt: new Date(2025, 7, 5), // August 5, 2025
      categoryId: createdCategories.find(c => c.slug === 'tutorials')?.id || '',
      authorId: adminUser.id,
      projectUrl: 'https://api.apdadebate.org',
      githubUrl: 'https://github.com/APDA-Tech-Committee/apda-api',
      tags: ['api', 'web-development', 'backend']
    },
    {
      title: 'Tech Committee 2025-2026 Roadmap',
      slug: 'tech-committee-2025-2026-roadmap',
      excerpt: 'Our plans and priorities for the upcoming debate season, including new tools and infrastructure improvements.',
      content: `
# Tech Committee 2025-2026 Roadmap

As we begin the new debate season, the APDA Tech Committee has established the following priorities and projects for the year ahead.

## Key Initiatives

1. **Tournament Management System**: Complete beta testing and roll out to all APDA tournaments
2. **Mobile App Development**: Create a native mobile app for tournament registration and results
3. **Infrastructure Upgrade**: Migrate core services to a more scalable cloud architecture
4. **Data Analysis Tools**: Develop tools to analyze historical tournament data and provide insights

## Timeline

- **Fall 2025**: Tournament Management System full release
- **Winter 2025**: Mobile app beta release
- **Spring 2026**: Infrastructure upgrade and data analysis tools

## Get Involved

We are always looking for developers, designers, and testers to help with our projects. If you are interested in joining the Tech Committee or contributing to any of these initiatives, please reach out to us at tech@apdadebate.org.

## Feedback

Have suggestions for our roadmap? We would love to hear from you! Please share your thoughts and ideas at our next community meeting or via email.
      `,
      status: 'PUBLISHED',
      featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      publishedAt: new Date(2025, 7, 10), // August 10, 2025
      categoryId: createdCategories.find(c => c.slug === 'updates')?.id || '',
      authorId: adminUser.id,
      tags: ['updates']
    }
  ];

  // Add more project posts
  const additionalProjects = [
    {
      title: 'APDA Tab Management System',
      slug: 'apda-tab-management-system',
      excerpt: 'A specialized tabulation system for APDA tournaments featuring automated pairing, scheduling, and results tracking.',
      content: `
# APDA Tab Management System

The APDA Tab Management System is a specialized tool built specifically for parliamentary debate tournaments. It handles all aspects of tournament tabulation, from team registration to results publishing.

## Key Features
- Team and judge registration
- Automated pairing algorithms
- Real-time results tracking
- Break calculation
- Speaker point management
- Tournament statistics

## Technology Stack
- React frontend with TypeScript
- Node.js backend with Express
- PostgreSQL database
- WebSocket for real-time updates

## Current Status
The system is currently being used at major APDA tournaments and continues to be refined based on feedback.
      `,
      status: 'PUBLISHED',
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
      publishedAt: new Date(2025, 6, 15), // July 15, 2025
      categoryId: createdCategories.find(c => c.slug === 'projects')?.id || '',
      authorId: adminUser.id,
      projectUrl: 'https://tab.apdadebate.org',
      githubUrl: 'https://github.com/APDA-Tech-Committee/tab-system',
      tags: ['web-development', 'database', 'open-source']
    },
    {
      title: 'Debate Timer Mobile App',
      slug: 'debate-timer-app',
      excerpt: 'A mobile app for timing parliamentary debate speeches with customizable formats, visual cues, and speech statistics.',
      content: `
# Debate Timer Mobile App

The Debate Timer is a specialized mobile application designed for parliamentary debate timekeeping. It supports multiple debate formats and provides both visual and audio signals.

## Features
- Multiple debate format presets (APDA, BP, Worlds, etc.)
- Customizable speech lengths and prep times
- Visual and audio notifications
- Dark mode support
- Speech time statistics
- Offline functionality

## Platform Support
- iOS and Android (React Native)
- Progressive Web App version

## Download Links
- [App Store](https://apps.apple.com/us/app/apda-debate-timer)
- [Google Play](https://play.google.com/store/apps/details?id=org.apda.debatetimer)
      `,
      status: 'PUBLISHED',
      featuredImage: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
      publishedAt: new Date(2025, 5, 20), // June 20, 2025
      categoryId: createdCategories.find(c => c.slug === 'projects')?.id || '',
      authorId: adminUser.id,
      projectUrl: 'https://timer.apdadebate.org',
      githubUrl: 'https://github.com/APDA-Tech-Committee/debate-timer',
      tags: ['mobile', 'ui-ux', 'open-source']
    },
    {
      title: 'Judge Allocation AI',
      slug: 'judge-allocation-ai',
      excerpt: 'An AI-powered system that optimizes judge assignments for debate tournaments based on conflicts, experience, and round importance.',
      content: `
# Judge Allocation AI

Our Judge Allocation AI is a cutting-edge solution to one of the most complex problems in tournament management: assigning judges to debates fairly and efficiently.

## The Problem
Manual judge allocation is time-consuming and prone to errors. Tournament directors must balance:
- Avoiding conflicts of interest
- Ensuring judging quality for important rounds
- Providing fair and diverse judging panels
- Balancing judge workload

## Our Solution
The Judge Allocation AI uses machine learning algorithms to:
- Automatically identify potential conflicts
- Optimize judge assignments across all rooms
- Prioritize experienced judges for break rounds
- Ensure diversity in judging panels

## Technical Details
- Python-based backend with scikit-learn and TensorFlow
- Custom optimization algorithms
- Integration with the APDA Tab Management System
      `,
      status: 'PUBLISHED',
      featuredImage: 'https://images.unsplash.com/photo-1677442135066-f76ad2a0e052?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80',
      publishedAt: new Date(2025, 4, 5), // May 5, 2025
      categoryId: createdCategories.find(c => c.slug === 'projects')?.id || '',
      authorId: adminUser.id,
      projectUrl: null,
      githubUrl: 'https://github.com/APDA-Tech-Committee/judge-ai',
      tags: ['api', 'backend', 'open-source']
    }
  ];
  
  // Combine all posts
  const allPosts = [...posts, ...additionalProjects];

  // Create posts
  for (const postData of allPosts) {
    const { tags: tagSlugs, ...postInfo } = postData;

    const post = await prisma.post.create({
      data: {
        ...postInfo
      }
    });

    console.log(`Created post: ${post.title}`);

    // Connect tags
    if (tagSlugs && tagSlugs.length > 0) {
      for (const tagSlug of tagSlugs) {
        const tag = createdTags.find(t => t.slug === tagSlug);
        if (tag) {
          await prisma.tagsOnPosts.create({
            data: {
              postId: post.id,
              tagId: tag.id
            }
          });
        }
      }
    }
  }

  console.log('Tech blog posts seeding completed!');
}

async function main() {
  try {
    await seedTechPosts();
  } catch (error) {
    console.error('Error seeding tech blog posts:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Check if this module is being run directly
if (process.argv[1] === import.meta.url) {
  main();
}
