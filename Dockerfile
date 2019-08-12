FROM madnificent/ember:3.10.1 as builder

LABEL maintainer="info@redpencil.io"

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN DEPLOY_ENV=production ember build -prod

FROM semtech/ember-proxy-service:1.4.0

COPY --from=builder /app/dist /app

COPY ./proxy/file-upload.conf /config/file-upload.conf