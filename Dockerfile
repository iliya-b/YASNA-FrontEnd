FROM node:13.8.0 as build

WORKDIR /frontend

COPY package.json package.json
COPY . .


FROM nginx:alpine

COPY --from=build /frontend/public /usr/share/nginx/html

COPY nginx/app.conf.template /etc/nginx/conf.d/app.conf.template

CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/app.conf.template > /etc/nginx/conf.d/app.conf" && nginx -g 'daemon off;'
