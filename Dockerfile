# Use official Node.js image from Docker Hub
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /webapp_banshawali

# Copy package.json and package-lock.json to work directory
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to work directory
COPY . .

# Run the application
CMD ["npm", "run", "dev"]
