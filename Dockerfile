# Use an official Node.js 18.14.2 runtime as a parent image
FROM node:18.14.2-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Start the app
CMD [ "npm", "run", "start:prod" ]
