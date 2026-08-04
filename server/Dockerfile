FROM node:22

WORKDIR /usr/src/app/src

COPY ./src/package*.json ./

RUN npm install

COPY ./src ./

EXPOSE 8000

CMD ["npx", "nodemon", "index.js"]