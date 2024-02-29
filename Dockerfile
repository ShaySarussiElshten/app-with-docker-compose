# Use an intermediate container to fetch wait-for-it.sh
FROM alpine:latest as builder
WORKDIR /app
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh ./wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

# Your main build stage
FROM node:14
WORKDIR /code
COPY --from=builder /app/wait-for-it.sh .
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod +x ./wait-for-it.sh
EXPOSE 5000
CMD [ "node", "src/server.js" ]