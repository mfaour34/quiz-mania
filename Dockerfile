FROM node:lts-alpine
ENV NODE_ENV=production
ENV HTTP_PORT=8080
ENV API_ACCESS_TOKENS=TEST_API_KEY,TEST_API_KEY2
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 8080
RUN chown -R node /usr/src/app
USER node
RUN npm run build
CMD ["npm", "start"]
