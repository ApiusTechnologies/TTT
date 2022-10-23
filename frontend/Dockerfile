FROM node:16.17.1-alpine3.16

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps


COPY . ./
RUN mkdir node_modules/.cache && chown -R node /app/node_modules/.cache
USER node

CMD ["npm", "start"]
