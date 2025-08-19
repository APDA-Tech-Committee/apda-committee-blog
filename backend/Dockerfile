# Backend Dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# Build TypeScript
RUN npm run build

# (Optional) Run Prisma migrations if using a cloud DB
RUN npx prisma migrate deploy

EXPOSE 3000
CMD ["node", "dist/index.js"]
