# Base image
FROM node:13-alpine
# Make folder to put our files in
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/frontend
# Set working directory so that all
# subsequent command runs in this folder
WORKDIR /usr/src/app/frontend
ARG PORT
ENV PORT=$PORT
# Copy package json and install dependencies
COPY package*.json ./
RUN npm install
# Copy our app
COPY . .
RUN npm run build
# Expose port to access server
EXPOSE $PORT
# Command to run our app
<<<<<<< HEAD
CMD ["npm", "run", "start:prod"]
=======
CMD ["npm", "run", "start:dev"]
>>>>>>> bf0d2f7bed6eb3e840f4ac0eef957214e23cbb38
