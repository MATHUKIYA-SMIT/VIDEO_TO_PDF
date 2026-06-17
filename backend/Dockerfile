FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache python3

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","start"]