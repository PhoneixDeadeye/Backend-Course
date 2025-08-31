# Use an official node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Generate prima client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the application
CMD ["node", "./src/server.js"]