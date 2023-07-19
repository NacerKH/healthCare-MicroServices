FROM node:latest
 COPY  --chown=node:node . /usr/src/app  

RUN mkdir -p  /usr/src/app  
WORKDIR /usr/src/app
COPY package*.json ./usr/src/app


 

RUN npm install --silent
COPY . .
RUN chown -R node:node  /usr/src/app/node_modules 

EXPOSE 80
CMD ["npm","start "]


