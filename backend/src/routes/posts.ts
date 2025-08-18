import { Router, Request, Response } from 'express';
import { prisma } from '../index.js';
import { createLogger } from '../utils/logger.js';

const router = Router();
const logger = createLogger();

// GET /api/posts - Get all published posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, category, search, status = 'PUBLISHED' } = req.query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {
      status: status as string
    };

    if (category) {
      where.category = {
        name: {
          equals: category as string,
          mode: 'insensitive'
        }
      };
    }

    if (search) {
      const searchTerm = search as string;
      where.OR = [
        {
          title: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        },
        {
          excerpt: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        },
        {
          content: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        }
      ];
    }

    // Fetch posts with relations
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: {
            select: {
              name: true
            }
          },
          category: {
            select: {
              name: true,
              color: true
            }
          },
          committee: {
            select: {
              name: true,
              slug: true
            }
          },
          _count: {
            select: {
              comments: true
            }
          }
        },
        orderBy: {
          publishedAt: 'desc'
        },
        skip,
        take: limitNum
      }),
      prisma.post.count({ where })
    ]);

    res.json({
      posts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    logger.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET /api/posts/:slug - Get single post by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    const post = await prisma.post.findUnique({
      where: { 
        slug,
        status: 'PUBLISHED'
      },
      include: {
        author: {
          select: {
            name: true
          }
        },
        category: {
          select: {
            name: true,
            color: true
          }
        },
        committee: {
          select: {
            name: true,
            slug: true
          }
        },
        comments: {
          include: {
            author: {
              select: {
                name: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      }
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    logger.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

export default router;
