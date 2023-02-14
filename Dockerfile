FROM node:18-alpine as base

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build

CMD ["exit", "0"]

# Production
FROM node:18-alpine as prod

ENV NODE_ENV production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production \
    && npm cache clean --force

COPY --from=base /usr/src/app/dist ./
COPY --from=base /usr/src/app/doc ./

EXPOSE ${PORT:-4000}

CMD ["node", "dist/main"]

# Development
FROM base as dev

ENTRYPOINT docker/app/node-entrypoint.sh
