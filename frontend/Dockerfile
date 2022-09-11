# Dependencies:
FROM node:18-alpine as dependencies
LABEL maintainer="Felipe Bogaerts de Mattos"

WORKDIR /frontend

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Build:
FROM node:18 as builder

WORKDIR /frontend
COPY . .
COPY --from=dependencies /frontend/node_modules ./node_modules
RUN yarn build

# Entrypoint:
FROM node:18 as runner

WORKDIR /frontend
ENV NODE_ENV=production

COPY --from=builder /frontend/next.config.js ./
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/node_modules ./node_modules
COPY --from=builder /frontend/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]