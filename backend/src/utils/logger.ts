import winston from 'winston';

const toFile = process.env.LOG_TO_FILE === '1';
const logDir = process.env.LOG_DIR || '/tmp/logs';
const level = process.env.LOG_LEVEL || 'info';

const transports: winston.transport[] = [
  new winston.transports.Console({ level })
];

if (toFile) {
  transports.push(
    new winston.transports.File({
      filename: `${logDir}/app.log`,
      level
    })
  );
}

export const createLogger = () =>
  winston.createLogger({
    level,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports
  });
