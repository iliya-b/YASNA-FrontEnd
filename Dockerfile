FROM node:13.8.0-alpine as build

WORKDIR /frontend

COPY package.json package.json
COPY . .


FROM nginx:alpine

WORKDIR /usr/share/nginx/html
COPY --from=build /frontend/public .
COPY --from=build /frontend/app app/js
COPY --from=build /frontend/app/config.json app/config.json
COPY --from=build /frontend/app/templates app/templates
COPY --from=build /frontend/bootstrap components/bootstrap
COPY --from=build /frontend/libs components/js/main
COPY --from=build /frontend/styles styles

# todo: use gulp

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/app.conf.template /etc/nginx/conf.d/default.conf.template


CMD sh -c "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx  -g 'daemon off;'
