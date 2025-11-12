# Build stage
FROM oven/bun:canary-alpine AS build-stage

# Set working directory
WORKDIR /app

# Build argument for API URL
ARG VITE_BASE_API_URL
ENV VITE_BASE_API_URL=$VITE_BASE_API_URL

# Copy package files
COPY package*.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile || bun install

# Copy project files
COPY . .

# Build the application with verbose output
RUN bun run build-only
# Production stage
FROM nginx:stable-alpine AS production-stage

# Copy built files from build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy nginx configuration 
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]