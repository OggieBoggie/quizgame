# Step 1: Build the app
FROM node:20-alpine AS builder

# Set the working directory in the Docker container
WORKDIR /app

# Copy dependency files
COPY package*.json ./
COPY pnpm-locl.yaml* ./
COPY yarn.lock* ./

# Install dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Build your app
RUN npm run build

# Stage 2: Serve the application using a lightweight server like nginx
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]