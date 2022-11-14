FROM node:16.15-bullseye-slim AS base

RUN curl -fsSL https://get.pnpm.io/install.sh | sh -

RUN apk --no-cache add dumb-init

RUN mkdir -p /home/node/app && chown node:node /home/node/app

WORKDIR /home/node/app

USER node

RUN mkdir tmp


FROM base AS dependencies

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN pnpm install --prod

COPY --chown=node:node . .


FROM dependencies AS build

RUN pnpm build


FROM base AS production

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN pnpm install --prod

COPY --chown=node:node --from=build /home/node/app/dist .

CMD [ "dumb-init", "node", "main.js" ]