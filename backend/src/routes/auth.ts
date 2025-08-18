import { Router, Request, Response } from 'express';

const router = Router();

// Auth routes for future implementation
router.post('/login', async (req: Request, res: Response) => {
  res.status(501).json({ message: 'Authentication not implemented yet' });
});

router.post('/register', async (req: Request, res: Response) => {
  res.status(501).json({ message: 'Registration not implemented yet' });
});

router.post('/logout', async (req: Request, res: Response) => {
  res.status(501).json({ message: 'Logout not implemented yet' });
});

export default router;
