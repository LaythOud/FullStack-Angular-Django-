FROM node:23.5.0

WORKDIR /app
COPY ./opaala/package.json ./opaala/package-lock.json ./
RUN npm install

COPY ./opaala /app
ENV PATH="/app/node_modules/.bin:$PATH"

EXPOSE 4200

CMD ["npm", "start"]