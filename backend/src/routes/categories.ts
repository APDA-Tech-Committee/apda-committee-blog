import { Router, Request, Response } from 'express';

const router = Router();

// Mock categories for MVP
const mockCategories = [
  { id: '1', name: 'Announcement', slug: 'announcement', color: '#3B82F6', description: 'Official announcements and updates' },
  { id: '2', name: 'Education', slug: 'education', color: '#10B981', description: 'Educational content and resources' },
  { id: '3', name: 'Organization', slug: 'organization', color: '#8B5CF6', description: 'Organizational structure and processes' },
  { id: '4', name: 'Rules', slug: 'rules', color: '#F59E0B', description: 'Rules and regulations' },
  { id: '5', name: 'Events', slug: 'events', color: '#EF4444', description: 'Events and competitions' }
];

// GET /api/categories - Get all categories
router.get('/', async (req: Request, res: Response) => {
  try {
    res.json(mockCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

export default router;
