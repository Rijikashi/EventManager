FROM node:15.14.0

# RUN apt-get update && apt-get install
RUN mkdir /app
WORKDIR /app

COPY . .
RUN npm ci

CMD ["npm","start"]