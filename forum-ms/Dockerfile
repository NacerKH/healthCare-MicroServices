FROM node:latest
 COPY  --chown=node:node . /usr/src/app  

RUN mkdir -p  /usr/src/app  
WORKDIR /usr/src/app
COPY package*.json ./usr/src/app


 

RUN npm install 
COPY . .
RUN chown -R node:node  /usr/src/app/node_modules 

EXPOSE 5000
CMD ["npm","start "]


