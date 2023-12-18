FROM node:19-alpine as dependencies

WORKDIR /acordes
COPY package.json ./
COPY package-lock.json ./

RUN npm ci
RUN npm install --dev typescript @types/react @types/node

FROM node:19-alpine as builder

WORKDIR /acordes
COPY ./package.json .
COPY ./package-lock.json .
COPY --from=dependencies /acordes/node_modules ./node_modules

COPY . .
RUN npm build

FROM node:19-alpine as runner

WORKDIR /acordes
ENV NODE_ENV=production

COPY --from=builder /acordes/public ./public
COPY --from=builder /acordes/.next ./.next
COPY --from=builder /acordes/node_modules ./node_modules
COPY --from=builder /acordes/package.json ./package.json

RUN addgroup -g 1001 -S node-js
RUN adduser -S admin -u 1001
RUN chown -R admin:node-js /acordes/.next
USER admin

EXPOSE 3000
CMD ["npm", "start"]