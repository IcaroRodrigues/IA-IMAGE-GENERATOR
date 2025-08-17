# Stage 1: Use an official Node.js runtime as a parent image
# We'll use a specific Long-Term Support (LTS) version for stability
FROM node:18-alpine

# Set the working directory inside the container
# All subsequent commands will run from this directory
WORKDIR /app

# Copy package.json and package-lock.json (if availabe)
# This is done as a separate step to leverage Docker's layer caching
# Dependencies will only be re-installed if these files change
COPY package*.json ./

# Install application dependencies using npm
RUN npm install

# Copy the rest of your application's source code insto the container
COPY . .

# The application inside the container will listen on port 3000
EXPOSE 3000

# Define the command to run your application
# We'll use the "dev" script from your package.json to enable hot-reloading with nodemon
CMD [ "npm", "run", "dev" ]
