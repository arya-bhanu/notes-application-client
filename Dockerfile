FROM node:alpine3.18

WORKDIR /app 

ARG NEXT_PUBLIC_SERVER_URL=http://localhost:5000/graphql
ENV NEXT_PUBLIC_SERVER_URL=http://localhost:5000/graphql

COPY . .

RUN npm i 

CMD [ "npm" ,"run","dev" ]

