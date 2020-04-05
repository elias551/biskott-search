FROM node:current-alpine

ENV TS=Europe/Paris
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /var/www/app
WORKDIR /var/www/app

COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn build

CMD yarn start
