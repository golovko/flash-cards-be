FROM node:latest

RUN mkdir -p /aws/app
WORKDIR /aws

COPY package.json /aws
COPY controllers /aws/controllers
COPY db /aws/db
COPY errors /aws/errors
COPY models /aws/models
COPY app.js /aws
COPY listen.js /aws

RUN npm install --omit=dev
EXPOSE 3000/tcp

CMD [ "npm", "run", "start" ]