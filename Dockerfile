# Use an official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code (including `src` and `public` folders) to the working directory
COPY . .

# Expose the port on which the app will run
EXPOSE 3000

# Start the React app
CMD ["yarn", "start"]
