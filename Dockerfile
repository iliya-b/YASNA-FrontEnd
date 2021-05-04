FROM node:13.8.0-alpine as build

WORKDIR /frontend

COPY package.json package.json
COPY . .


FROM nginx:alpine

COPY --from=build /frontend/public /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/app.conf.template /etc/nginx/conf.d/default.conf.template


CMD sh -c "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx  -g 'daemon off;'
