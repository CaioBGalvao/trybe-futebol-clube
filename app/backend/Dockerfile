FROM node:16.14-alpine
WORKDIR /app-backend
COPY ./backend/package*.json ./backend/
RUN npm install
COPY . .
CMD ["npm", "start"]
