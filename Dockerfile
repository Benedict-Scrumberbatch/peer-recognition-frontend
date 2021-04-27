# Base image
FROM node:13-alpine
# Make folder to put our files in
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/frontend
# Set working directory so that all
# subsequent command runs in this folder
WORKDIR /usr/src/app/frontend
ARG PORT=3000
ENV PORT=$PORT

ARG NPM_RUN_SCRIPT="start:prod"
ENV NPM_RUN_SCRIPT=${NPM_RUN_SCRIPT}

ARG NPM_BUILD_SCRIPT="build"
ENV NPM_BUILD_SCRIPT=${NPM_BUILD_SCRIPT}

# Copy package json and install dependencies
COPY package*.json ./
RUN npm install
# Copy our app
COPY . .
RUN npm run ${NPM_BUILD_SCRIPT}
# Expose port to access server
EXPOSE $PORT
# Command to run our app
CMD npm run ${NPM_RUN_SCRIPT}
