FROM node:14

ARG BASE_PATH
ENV BASE_PATH=$BASE_PATH

# Setup
COPY package* ./
RUN npm ci

COPY client/package* ./client/
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start:prod"]
