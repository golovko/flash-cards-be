FROM node:latest

RUN mkdir -p /aws/app
WORKDIR /aws

COPY package.json /aws
COPY controllers /aws
COPY db /aws
COPY errors /aws
COPY models /aws
COPY app.js /aws
COPY listen.js /aws

RUN npm install
EXPOSE 3000/tcp

CMD [ "npm", "run", "start" ]