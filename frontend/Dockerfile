# Build React app
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Serve using Nginx
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
# If using CRA instead of Vite, change `/dist` to `/build`

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
