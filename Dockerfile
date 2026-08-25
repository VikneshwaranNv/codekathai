# Production / Cloud Sandbox Dockerfile for C GCC Compiler Service
FROM node:20-alpine

# Install GCC, G++, Make, and musl-dev for isolated C compilation
RUN apk add --no-cache gcc g++ make musl-dev

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy server code
COPY server ./server
COPY server/index.js ./index.js

# Expose backend port
EXPOSE 3001

# Environment config
ENV NODE_ENV=production
ENV PORT=3001

# Start C Compiler Express service
CMD ["node", "server/index.js"]
