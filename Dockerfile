# builder stage
FROM node:14.14.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --quiet 
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

# docker build -f Dockerfile.dev .