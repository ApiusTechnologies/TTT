FROM node:16.17.1-alpine3.16

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . ./

CMD ["npm", "start"]
