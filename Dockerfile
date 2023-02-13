FROM node:18-alpine as base

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build

CMD ["exit", "0"]

# Prodction
FROM node:18-alpine3.17 as prod

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production \
    && npm cache clean --force

COPY --from=base /usr/src/app/dist ./
COPY --from=base /usr/src/app/doc ./

ENV NODE_ENV production

EXPOSE ${PORT:-4000}

CMD ["node", "dist/main"]

# Development
FROM base as dev

VOLUME /usr/src/app/node_modules

ENTRYPOINT docker/app/node-entrypoint.sh
