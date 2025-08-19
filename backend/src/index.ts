import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { createLogger } from './utils/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';

// Route modules (these should NOT instantiate Prisma at import-time)
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';
import categoriesRoutes from './routes/categories.js';
import tagsRoutes from './routes/tags.js';
import committeesRoutes from './routes/committees.js';

// ---------- Env ----------
dotenv.config();

// ---------- Logger ----------
const logger = createLogger();

// ---------- Express ----------
const app = express();
const port = Number(process.env.PORT) || 8080;     // Cloud Run expects this
const host = '0.0.0.0';                            // listen on all interfaces

// ---------- Middleware ----------
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// ---------- Lightweight endpoints (no DB needed) ----------
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Quiet down the common favicon probe so it doesn't 404 spam logs
app.get('/favicon.ico', (_req, res) => res.status(204).end());


app.get('/', (_req, res) => {
  res.status(200).json({ service: 'apda-committee-blog', ok: true });
});

// ---------- Prisma (lazy) ----------
// Do NOT create Prisma at top-level; Cloud Run must see the port open first.
let prisma: PrismaClient | null = null;

// Helper to access prisma where needed in route handlers (if you refactor routes)
export const getPrisma = () => {
  if (!prisma) prisma = new PrismaClient();
  return prisma;
};

export { prisma };

// ---------- API routes (safe to attach before Prisma connects) ----------
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/tags', tagsRoutes);
app.use('/api/committees', committeesRoutes);

// ---------- 404 ----------
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// ---------- Error handling ----------
app.use(errorHandler);

// ---------- Start server first ----------
const server = app.listen(port, host, () => {
  logger.info(`Server running on http://${host}:${port}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});

// ---------- Initialize Prisma AFTER server is up ----------
(async () => {
  try {
    prisma = new PrismaClient();
    await prisma.$connect();
    logger.info('Prisma connected');
  } catch (err) {
    // Important: don't exit — keep container healthy so you can inspect /health and logs
    logger.error('Prisma failed to start:', err);
  }
})();

// ---------- Graceful shutdown ----------
const gracefulShutdown = async (signal: string) => {
  logger.info(`Received ${signal}. Starting graceful shutdown...`);
  try {
    if (prisma) {
      await prisma.$disconnect();
      logger.info('Database connection closed.');
    }
    server.close(() => {
      logger.info('HTTP server closed.');
      process.exit(0);
    });
    // Fallback if server doesn't close in time
    setTimeout(() => {
      logger.warn('Forcing shutdown after timeout.');
      process.exit(0);
    }, 10_000).unref();
  } catch (error) {
    logger.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Catch unhandled errors without killing the process before listen
process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception:', err);
});
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled promise rejection:', reason as any);
});

export default app;
