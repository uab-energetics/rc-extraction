# TODO - cleanup source files. Two-stage build, maybe?
FROM node:carbon

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

CMD npm run serve
