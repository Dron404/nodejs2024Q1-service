
FROM node:alpine


WORKDIR /app

COPY . .

EXPOSE 4000

CMD npm ci && npx prisma generate && npx prisma migrate deploy && npm start
