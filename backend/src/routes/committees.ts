import express from 'express';
import { prisma } from '../index.js';
import { createLogger } from '../utils/logger.js';

const router = express.Router();
const logger = createLogger();

// Get all committees
router.get('/', async (req, res) => {
  try {
    const committees = await prisma.committee.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            members: true,
            posts: {
              where: {
                status: 'PUBLISHED'
              }
            }
          }
        }
      }
    });

    res.json(committees);
  } catch (error) {
    logger.error('Error fetching committees:', error);
    res.status(500).json({ error: 'Failed to fetch committees' });
  }
});

// Get single committee by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const committee = await prisma.committee.findUnique({
      where: { slug },
      include: {
        members: {
          orderBy: [
            { order: 'asc' },
            { role: 'asc' }
          ]
        },
        posts: {
          where: {
            status: 'PUBLISHED'
          },
          include: {
            author: {
              select: {
                name: true
              }
            },
            category: true,
            _count: {
              select: {
                comments: true
              }
            }
          },
          orderBy: {
            publishedAt: 'desc'
          }
        }
      }
    });

    if (!committee) {
      return res.status(404).json({ error: 'Committee not found' });
    }

    res.json(committee);
  } catch (error) {
    logger.error('Error fetching committee:', error);
    res.status(500).json({ error: 'Failed to fetch committee' });
  }
});

// Get committee members
router.get('/:slug/members', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const committee = await prisma.committee.findUnique({
      where: { slug },
      include: {
        members: {
          orderBy: [
            { order: 'asc' },
            { role: 'asc' }
          ]
        }
      }
    });

    if (!committee) {
      return res.status(404).json({ error: 'Committee not found' });
    }

    res.json(committee.members);
  } catch (error) {
    logger.error('Error fetching committee members:', error);
    res.status(500).json({ error: 'Failed to fetch committee members' });
  }
});

// Get committee posts
router.get('/:slug/posts', async (req, res) => {
  try {
    const { slug } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const committee = await prisma.committee.findUnique({
      where: { slug },
      select: { id: true }
    });

    if (!committee) {
      return res.status(404).json({ error: 'Committee not found' });
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: {
          committeeId: committee.id,
          status: 'PUBLISHED'
        },
        include: {
          author: {
            select: {
              name: true
            }
          },
          category: true,
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
        take: limit
      }),
      prisma.post.count({
        where: {
          committeeId: committee.id,
          status: 'PUBLISHED'
        }
      })
    ]);

    res.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Error fetching committee posts:', error);
    res.status(500).json({ error: 'Failed to fetch committee posts' });
  }
});

export default router;
