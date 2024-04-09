FROM node:alpine
WORKDIR /app
COPY . .
COPY package*.json ./
RUN npm ci
CMD npx prisma generate && npx prisma migrate deploy && npm run start:dev




