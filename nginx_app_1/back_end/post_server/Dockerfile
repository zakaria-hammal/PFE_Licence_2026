FROM node:18-alpine

WORKDIR /usr/src/app

EXPOSE 3000

COPY package.json package-lock.json ./
RUN npm ci
COPY ./index.js ./

CMD ["node", "index.js"]
