FROM nginx:stable-alpine

COPY ../frontend_main/build /usr/share/nginx/html/frontend_main
COPY ../frontend_business/build /usr/share/nginx/html/frontend_business
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /etc/letsencrypt/live/nedvizhka.tech/privkey.pem /etc/letsencrypt/live/nedvizhka.tech/privkey.pem
COPY /etc/letsencrypt/live/nedvizhka.tech/fullchain.pem /etc/letsencrypt/live/nedvizhka.tech/fullchain.pem

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


