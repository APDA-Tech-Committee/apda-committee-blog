import { Router, Request, Response } from 'express';

const router = Router();

// Mock tags for MVP
const mockTags = [
  { id: '1', name: 'Parliamentary Procedure', slug: 'parliamentary-procedure' },
  { id: '2', name: 'Debate Format', slug: 'debate-format' },
  { id: '3', name: 'Committee Work', slug: 'committee-work' },
  { id: '4', name: 'Best Practices', slug: 'best-practices' },
  { id: '5', name: 'Education', slug: 'education' }
];

// GET /api/tags - Get all tags
router.get('/', async (req: Request, res: Response) => {
  try {
    res.json(mockTags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

export default router;
