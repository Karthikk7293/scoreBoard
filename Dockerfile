FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN pnpm install

COPY . . 

EXPOSE 4000
CMD [ "pnpm","run","dev" ]