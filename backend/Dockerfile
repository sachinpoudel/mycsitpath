FROM node:20-alpine

WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

RUN npm install

# Now copy the rest of the backend code
COPY . .

EXPOSE 3001

CMD ["npm", "start"]
