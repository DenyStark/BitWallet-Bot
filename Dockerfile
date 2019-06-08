FROM node:12.4.0-alpine

WORKDIR /home/app

COPY package.json /home/app/
COPY yarn.lock /home/app/

RUN yarn

COPY . /home/app

RUN yarn start
