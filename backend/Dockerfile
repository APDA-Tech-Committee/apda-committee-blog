# Backend Dockerfile
FROM node:22-alpine

WORKDIR /app


COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx prisma generate --schema=prisma/schema.postgres.prisma

# Build TypeScript
RUN npm run build
RUN apk add --no-cache openssl1.1


EXPOSE 3000
CMD ["node", "dist/index.js"]
