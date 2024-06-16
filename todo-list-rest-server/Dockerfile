FROM node:20-alpine
WORKDIR /app

COPY package.json .
COPY ./dist ./
RUN npm install --omit=dev

CMD ["node", "index.js"]