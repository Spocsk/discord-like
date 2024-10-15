FROM node:20

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3001

CMD ["yarn", "start:dev"]
