FROM node:16-alpine
WORKDIR /user/src/frontend

COPY package* ./

RUN npm install
RUN npm install serve


COPY . ./

EXPOSE 3000

CMD ["npm", "start"]
