FROM node:lts AS build
WORKDIR /opt/app
COPY package* ./
RUN npm install
COPY src ./src
COPY public ./public
EXPOSE 3000
RUN npm run build
CMD ["npm", "start"]