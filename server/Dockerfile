# backend/Dockerfile
FROM node:20-slim AS builder
WORKDIR /app

# copy dependency manifests first for better layer caching
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci

# copy source and build
COPY . .
RUN npm run build

# runner
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# install only production deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# copy compiled output
COPY --from=builder /app/dist ./dist

EXPOSE 5000
CMD ["node", "dist/server.js"]
