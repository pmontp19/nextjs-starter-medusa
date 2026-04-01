FROM node:20-alpine

WORKDIR /server

COPY package.json package-lock.json* yarn.lock .yarnrc.yml ./
COPY .yarn/releases .yarn/releases

RUN yarn install

COPY . .

RUN chmod +x start.sh

EXPOSE 9000 5173

CMD ["./start.sh"]
