FROM node:13.8.0-alpine as build

WORKDIR /frontend

COPY package.json package.json
COPY . .


FROM nginx:alpine

COPY --from=build /frontend/public /usr/share/nginx/html

COPY nginx/app.conf.template /etc/nginx/conf.d/app.conf.template
RUN rm /etc/nginx/conf.d/default.conf


CMD envsubst < /etc/nginx/conf.d/app.conf.template > /etc/nginx/conf.d/app.conf && sleep 2 && cat /etc/nginx/nginx.conf  && nginx  -g 'daemon off;'
