# syntax=docker/dockerfile:1

# ---- builder ----
FROM node:24-alpine AS builder
WORKDIR /app

# Write .env at /app so Vite's loadEnv(mode, parentDir, "VITE_") picks it up
ARG VITE_API_BASE_URL="/api"
RUN echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > /app/.env

# Install deps (better layer caching)
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm ci

# Build static assets (env inlined into bundle as /api)
COPY frontend/ ./
RUN npm run build

# ---- runtime ----
FROM nginx:alpine AS runtime
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80