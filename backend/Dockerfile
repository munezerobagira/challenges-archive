FROM node:16.13.2-alpine3.15
WORKDIR /app/backend
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
COPY . .
EXPOSE  5555
CMD ["npm", "start"]