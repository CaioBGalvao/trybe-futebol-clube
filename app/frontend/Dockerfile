FROM node:16.14-alpine
WORKDIR /app-frontend
COPY ./frontend/package*.json ./frontend/
RUN npm install
COPY . .
CMD ["npm", "start"]

