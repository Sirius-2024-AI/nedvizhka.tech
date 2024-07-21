FROM node:16-alpine

WORKDIR /frontend_main

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY /build /usr/share/nginx/html
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


