# Use the official Node.js image as the base image
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Use a lightweight server to serve the built application
FROM node:16-alpine

# Install `serve` to serve the application
RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app/dist /app

# Expose port 5000
EXPOSE 5000

# Start the server
CMD ["serve", "-s", ".", "-l", "5000"]
