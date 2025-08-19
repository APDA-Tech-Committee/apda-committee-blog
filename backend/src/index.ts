import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { createLogger } from './utils/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';

dotenv.config();

const logger = createLogger();
const app = express();
const port = Number(process.env.PORT) || 8080;
const host = '0.0.0.0';

app.use(helmet());
app.use(compression());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://apda-committee-blog-frontend-568718017696.us-east4.run.app'
  ],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    env: process.env.NODE_ENV || 'development',
  });
});

app.get('/favicon.ico', (_req, res) => res.status(204).end());

app.get('/', (_req, res) => {
  res.status(200).json({ service: 'apda-committee-blog', ok: true });
});

export let prisma!: PrismaClient;

export const getPrisma = () => {
  if (!prisma) prisma = new PrismaClient();
  return prisma;
};

const notFound = (req: express.Request, res: express.Response) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
};

const server = app.listen(port, host, () => {
  logger.info(`Server listening on http://${host}:${port}`);
  logger.info(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`FRONTEND_URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});

(async () => {
  try {
    const [
      authRoutesMod,
      postsRoutesMod,
      categoriesRoutesMod,
      tagsRoutesMod,
      committeesRoutesMod,
    ] = await Promise.all([
      import('./routes/auth.js'),
      import('./routes/posts.js'),
      import('./routes/categories.js'),
      import('./routes/tags.js'),
      import('./routes/committees.js'),
    ]);

    app.use('/api/auth', authRoutesMod.default);
    app.use('/api/posts', postsRoutesMod.default);
    app.use('/api/categories', categoriesRoutesMod.default);
    app.use('/api/tags', tagsRoutesMod.default);
    app.use('/api/committees', committeesRoutesMod.default);

    app.use('*', notFound);
    app.use(errorHandler);

    logger.info('Routes mounted');
  } catch (e) {
    logger.error('Route import/mount failed:', e);
    app.use('*', notFound);
    app.use(errorHandler);
  }

  try {
    prisma = new PrismaClient();
    await prisma.$connect();
    logger.info('Prisma connected');
  } catch (e) {
    logger.error('Prisma failed to connect:', e);
  }
})();

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
    setTimeout(() => {
      logger.warn('Forcing shutdown after timeout.');
      process.exit(0);
    }, 10000).unref();
  } catch (error) {
    logger.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('uncaughtException', (err) => logger.error('Uncaught exception:', err));
process.on('unhandledRejection', (reason) => logger.error('Unhandled promise rejection:', reason as any));

export default app;
