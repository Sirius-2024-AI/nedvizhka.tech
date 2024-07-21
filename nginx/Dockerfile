FROM node:16-alpine

WORKDIR /tmp

COPY ./frontend_main /usr/share/nginx/html/frontend_main
COPY ./frontend_business /usr/share/nginx/html/frontend_business

WORKDIR /usr/share/nginx/html/frontend_main

RUN npm install
RUN npm run build

WORKDIR /usr/share/nginx/html/frontend_business

RUN npm install
RUN npm run build

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


