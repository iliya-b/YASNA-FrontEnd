FROM node:13.8.0 as build

WORKDIR /frontend

COPY frontend/package.json package.json
COPY frontend .


FROM nginx:alpine

COPY --from=build /app/frontend/public /usr/share/nginx/html
