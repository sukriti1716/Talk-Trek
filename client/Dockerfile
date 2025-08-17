# BUILD STAGE
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# DEPLOY STAGE
FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html
