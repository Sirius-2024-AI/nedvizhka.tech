FROM node:16-alpine

WORKDIR .

COPY ./frontend_main ./frontend_main
COPY ./frontend_business ./frontend_business

WORKDIR ./frontend_main

RUN npm install
RUN npm run build

WORKDIR ./frontend_business

RUN npm install
RUN npm run build

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


