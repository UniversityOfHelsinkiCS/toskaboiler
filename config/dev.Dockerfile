FROM node:14

WORKDIR /usr/src/app

# Setup
COPY . .

EXPOSE 8000

CMD ["npm", "run", "start:dev"]