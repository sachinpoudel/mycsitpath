# ============ STAGE 1: BUILD ============
# This stage is BIG (~400MB) but temporary
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install          # Installs ALL dependencies (including devDependencies)

# Copy source code and build
COPY . .
RUN npm run build        # Creates /app/dist folder

# At this point, this stage has:
# - Node.js runtime
# - All source files (.tsx, .ts, etc.)
# - node_modules (huge!)
# - Built files in /dist


# ============ STAGE 2: PRODUCTION ============
# This stage is SMALL (~50MB) - final image
FROM nginx:alpine AS production

# Copy ONLY the built files from stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Final image has:
# - Nginx (tiny)
# - Built HTML/CSS/JS files only
# - NO Node.js, NO source code, NO node_modules