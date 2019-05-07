FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install
COPY node index.js
EXPOSE 8082
