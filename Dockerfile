
FROM node:alpine
WORKDIR /app
COPY . .
EXPOSE 4000
CMD sleep 5 && npm ci && npx prisma generate && npx prisma migrate deploy && npm start
