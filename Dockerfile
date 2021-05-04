FROM node:13.8.0 as build

WORKDIR /frontend

COPY package.json package.json
COPY . .


FROM nginx:alpine

COPY --from=build /frontend/public /usr/share/nginx/html
