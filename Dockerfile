# react dashboard build
# FROM node:17.2.0-alpine3.14 AS builder

# WORKDIR /admin

# COPY ./package*.json /admin

# RUN npm install

# COPY . /admin

# RUN npm run build-css
# RUN npm run build


# FROM nginx

# WORKDIR /nginx

# COPY ./nginx/default.conf /etc/nginx/conf.d/

# RUN rm -rf /usr/share/nginx/html/*

# RUN mkdir /usr/share/nginx/html


# COPY --from=builder /admin/build /usr/share/nginx/html

# EXPOSE 80
# CMD [ "nginx", "-g", "deamon off" ]

# Name the node stage "builder"
FROM node:17.2.0-alpine3.14 AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets
RUN npm install && npm build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
# WORKDIR /usr/share/nginx/html
WORKDIR /nginx
# Remove default nginx static assets
# RUN rm -rf ./*
RUN rm -rf ./usr/share/nginx/html
# Copy static assets from builder stage
COPY --from=builder /app/build /usr/share/nginx/html
# COPY --from=builder /app/build .
COPY ./nginx/default.conf /etc/nginx/conf.d/

# COPY ./nginx/default.conf /etc/nginx/conf.d/

# RUN rm -rf /usr/share/nginx/html/*

# RUN mkdir /usr/share/nginx/html