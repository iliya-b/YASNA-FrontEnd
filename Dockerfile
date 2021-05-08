FROM node:13.8.0-alpine as build

WORKDIR /frontend

COPY package.json package-lock.json ./
RUN npm install
COPY . .


FROM nginx:alpine

WORKDIR /usr/share/nginx/html


COPY --from=build /frontend/public .
COPY --from=build /frontend/app app/js
COPY --from=build /frontend/app/config.json app/config.json
COPY --from=build /frontend/app/templates app/templates

COPY --from=build /frontend/node_modules/bootstrap/dist components/bootstrap
COPY --from=build /frontend/node_modules/backbone/backbone-min.js components/js/main/backbone.min.js
COPY --from=build /frontend/node_modules/vis-network/dist components/js/main/vis-network
COPY --from=build /frontend/node_modules/requirejs/require.js components/js/main/require.min.js
COPY --from=build /frontend/node_modules/requirejs-text/text.js components/js/main/require-text.min.js
COPY --from=build /frontend/node_modules/underscore/underscore-min.js components/js/main/underscore.min.js
COPY --from=build /frontend/node_modules/jquery/dist/jquery.min.js components/js/main/jquery.min.js
COPY --from=build /frontend/node_modules/handlebars/dist/handlebars.min.js components/js/main/handlebars.min.js

COPY --from=build /frontend/styles styles


# todo: use gulp

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/app.conf.template /etc/nginx/conf.d/default.conf.template


CMD sh -c "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx  -g 'daemon off;'
