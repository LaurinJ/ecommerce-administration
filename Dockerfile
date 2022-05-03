# Name the node stage "builder"
FROM node:17.2.0-alpine3.14 AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY ./package*.json /app/
# install node modules and build assets
RUN npm install 
COPY . /app
RUN npm run build

# nginx state for serving content
FROM nginx:alpine
RUN rm -rf ./usr/share/nginx/html
# Copy static assets from builder stage
COPY --from=builder /app/build ./usr/share/nginx/html/dashboard
# COPY nginx conf
COPY ./nginx/default.conf /etc/nginx/conf.d/