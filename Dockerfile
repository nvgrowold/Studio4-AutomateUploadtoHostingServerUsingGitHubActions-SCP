# Step 1: Build the React app

# Use an official Node.js image as the base for the build stage.
# The `node:18-alpine` image is lightweight and optimized for production builds.
FROM node:18-alpine AS builder

# Set the working directory inside the container.
# This will be where all commands related to building the React app will execute.
WORKDIR /app

# Copy the package.json and yarn.lock files into the container.
# These files are needed to install the app's dependencies.
COPY package.json yarn.lock ./

# Install the dependencies for the React app using `yarn`.
# This ensures all necessary packages are available for the build process.
RUN yarn install

# Copy the entire application source code into the container.
# This includes the `src` and `public` folders as well as any other required files for the build.
COPY . .

# Build the React app for production.
# This command creates optimized static files in the `build` directory.
RUN yarn build

# Step 2: Serve the React app with nginx

# Use an official nginx image as the base for the serving stage.
# The `nginx:alpine` image is lightweight and commonly used for serving static files.
FROM nginx:alpine

# Copy the build output from the builder stage (`/app/build`) into the nginx directory (`/usr/share/nginx/html`).
# Nginx will serve the files in `/usr/share/nginx/html` by default.
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 so the app can be accessed from outside the container.
EXPOSE 80

# Start nginx in the foreground to keep the container running and serve the app.
CMD ["nginx", "-g", "daemon off;"]
