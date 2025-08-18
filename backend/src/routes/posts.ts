import { Router, Request, Response } from 'express';
import { prisma } from '../index.js';
import { z } from 'zod';

const router = Router();

// Mock data for MVP
const mockPosts = [
  {
    id: '1',
    title: 'Welcome to APDA Committees Platform',
    slug: 'welcome-to-apda-committees-platform',
    excerpt: 'Introducing our new digital platform for American Parliamentary Debate Association committee work and collaboration.',
    content: 'Full content here...',
    author: { name: 'APDA Admin' },
    category: { name: 'Announcement', color: '#3B82F6' },
    createdAt: '2025-08-18T00:00:00.000Z',
    featuredImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    status: 'PUBLISHED'
  },
  {
    id: '2',
    title: 'Committee Structure and Organization',
    slug: 'committee-structure-and-organization',
    excerpt: 'Understanding how APDA committees work together to advance parliamentary debate across the nation.',
    content: 'Full content here...',
    author: { name: 'Executive Committee' },
    category: { name: 'Organization', color: '#8B5CF6' },
    createdAt: '2025-08-16T00:00:00.000Z',
    featuredImage: 'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    status: 'PUBLISHED'
  }
];

// GET /api/posts - Get all published posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    
    // For MVP, return mock data
    let filteredPosts = mockPosts.filter(post => post.status === 'PUBLISHED');
    
    if (category) {
      filteredPosts = filteredPosts.filter(post => 
        post.category.name.toLowerCase() === (category as string).toLowerCase()
      );
    }
    
    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm)
      );
    }

    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    res.json({
      posts: paginatedPosts,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(filteredPosts.length / Number(limit)),
        totalPosts: filteredPosts.length,
        hasNext: endIndex < filteredPosts.length,
        hasPrev: Number(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET /api/posts/:slug - Get single post by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    const post = mockPosts.find(p => p.slug === slug && p.status === 'PUBLISHED');
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

export default router;
