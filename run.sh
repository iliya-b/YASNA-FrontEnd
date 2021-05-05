#!/bin/bash

docker build . -t yasna-frontend:latest
docker stop yasna-frontend
docker run  --env "PORT=80" -p 80:80 --rm --name yasna-frontend -d yasna-frontend:latest