FROM node:latest
RUN mkdir /app
RUN npm install nodemon -g
WORKDIR /app
ADD server /app
RUN npm install
EXPOSE 3000
CMD node bin/server.js
