FROM node:18-alpine

COPY package*.json ./
RUN npm install

COPY . .
CMD [ "node", "index.js" ]

EXPOSE 5000
