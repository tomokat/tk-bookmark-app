# Use 18-alpine to reduce the image size
FROM node:18-alpine

WORKDIR /usr/src/app

# need to use other user than root or else deployment will fail
COPY --chown=node:node package*.json ./

# build back-end
RUN npm install

COPY --chown=node:node . .

# build back-end
RUN npm run build

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# need to use other user than root or else deployment will fail
COPY --chown=node:node tk-bookmark/package*.json ./tk-bookmark

# build front-end
RUN cd tk-bookmark && npm ci && npm run build && cd ..

USER node

ENV NODE_ENV development

CMD [ "node", "dist/src/main.js" ]