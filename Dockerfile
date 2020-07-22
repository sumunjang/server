FROM node:12

RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm ci --only=production
EXPOSE 3000
CMD [ "npm", "start" ]
