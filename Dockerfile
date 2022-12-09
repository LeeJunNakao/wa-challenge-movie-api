FROM node:16-alpine AS builder
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build
COPY . .

FROM node:16-alpine AS server
WORKDIR /app
COPY package* ./
RUN yarn install --production --ignore-scripts
COPY --from=builder ./app/build ./
EXPOSE 3333
CMD ["yarn", "start"]