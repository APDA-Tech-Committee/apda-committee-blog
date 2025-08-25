import express from 'express';
import { prisma } from '../index.js';
import { createLogger } from '../utils/logger.js';

const router = express.Router();
const logger = createLogger();

// Get tech team info
router.get('/', async (_req, res) => {
  try {
    const techTeam = await prisma.techTeam.findFirst();
    
    if (!techTeam) {
      return res.status(404).json({ error: 'Tech team information not found' });
    }

    const members = await prisma.user.findMany({
      where: {
        role: {
          in: ['ADMIN', 'EDITOR']
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        imageUrl: true,
        position: true,
        role: true
      },
      orderBy: [
        { role: 'asc' },
        { name: 'asc' }
      ]
    });
    
    res.json({
      ...techTeam,
      members
    });
  } catch (error) {
    logger.error('Error fetching tech team information:', error);
    res.status(500).json({ error: 'Failed to fetch tech team information' });
  }
});

// Update tech team info (admin only)
router.put('/', async (req, res) => {
  try {
    // In a real app, you'd have authentication middleware
    // to ensure only admins can update this
    const { description, mission, contact } = req.body;
    
    if (!description || !mission || !contact) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const techTeam = await prisma.techTeam.findFirst();
    
    const updatedTeam = await prisma.techTeam.upsert({
      where: { id: techTeam?.id || 'default' },
      update: { description, mission, contact },
      create: { description, mission, contact }
    });
    
    res.json(updatedTeam);
  } catch (error) {
    logger.error('Error updating tech team information:', error);
    res.status(500).json({ error: 'Failed to update tech team information' });
  }
});

export default router;
