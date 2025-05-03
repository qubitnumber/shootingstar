    # Use an official Node.js runtime as a parent image
    FROM node:22-alpine AS builder

    # Set working directory
    WORKDIR /app

    # Copy package.json and package-lock.json
    COPY package*.json ./

    # Install app dependencies
    RUN pnpm install

    # Copy app source code
    COPY . .

    # Build the app for production
    RUN pnpm run build

    # Production image, copy all files and folders from the builder stage
    FROM node:22-alpine AS runner
    WORKDIR /app

    # Copy the dependencies and built artifacts from the builder stage
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/package.json ./package.json

    # Expose the port the app runs on
    EXPOSE 3000

    # Set the startup command to run the server
    CMD ["pnpm", "start"]