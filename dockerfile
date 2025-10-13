# Use Node.js LTS image
FROM node:20

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend code
COPY . ./

# Expose port
EXPOSE 4000

# Run the app
CMD ["node", "src/app.js"]