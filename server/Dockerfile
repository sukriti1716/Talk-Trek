FROM node:18-alpine

COPY package*.json .
RUN npm i -g npm@latest \
 && npm cache clean --force \
 && npm ci --no-audit --no-fund

COPY . .
CMD [ "node", "index.js" ]

EXPOSE 5000
