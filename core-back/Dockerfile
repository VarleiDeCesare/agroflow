FROM node:14-alpine

LABEL maintainer="Agrotehc"

ENV TZ=America/Sao_Paulo

WORKDIR /app

COPY . . 

RUN yarn \
    && npx @nestjs/cli build \
    && ls | grep -vE 'dist|prisma' | xargs rm -rf

ENV NODE_ENV=production

COPY package.json yarn.lock ./

RUN yarn install --production \
    && npx prisma generate \
    && yarn cache clean --force \
    && npm cache clean --force \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 3001

CMD ["node", "dist/main.js"]