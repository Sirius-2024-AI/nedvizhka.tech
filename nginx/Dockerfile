FROM nginx:stable-alpine

COPY ../frontend_main/build /usr/share/nginx/html/frontend_main
COPY ../frontend_business/build /usr/share/nginx/html/frontend_business
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY fullchain.pem /ssl
COPY privkey.pem /ssl

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


