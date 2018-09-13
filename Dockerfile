FROM node:10

# Set timezone to Europe/Helsinki
RUN echo "Europe/Helsinki" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

# Setup
RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

# Update
RUN apt-get update

RUN npm i;

EXPOSE 8000

CMD ["npm", "start"]