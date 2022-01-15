FROM node:14.17-alpine3.11

WORKDIR /usr/src

COPY package*.json ./

RUN npm ci

EXPOSE 8080

CMD ["npm", "run", "serve"]
