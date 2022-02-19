FROM node:14

# Create app directory
WORKDIR /usr/src/app
COPY .  /usr/src/app

RUN npm install
EXPOSE 4000
CMD ["node", "index.js"]
