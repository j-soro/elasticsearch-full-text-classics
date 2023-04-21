# Use Node LTS
FROM node:16

# Setup app working directory
WORKDIR /usr/src/app

# Copy package.json and packe-lock.json
COPY package*.json ./

# Install app depencencies
RUN npm install

# Copy sourcecode
COPY . .

# Start app
CMD [ "npm", "start" ]