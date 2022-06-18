# https://blog.logrocket.com/packaging-a-rust-web-service-using-docker/
FROM rust:alpine as builder

RUN apk update \
    && apk add --no-cache musl-dev \
    && rm -rf /var/cache/apk/*

# Create empty project
WORKDIR /usr/src
RUN cargo new --bin app
WORKDIR /usr/src/app

# Cache cargo dependencies
COPY ./packages/server/Cargo.toml ./
COPY ./Cargo.lock ./
RUN cargo build --release

# Remove hello world and replace it with the source code
RUN rm src/*.rs ./target/release/deps/server*
COPY ./.env ./
COPY ./packages/server/src ./src

RUN cargo build --release


FROM alpine:latest

EXPOSE 9999

ENV TZ=Etc/UTC

RUN apk update \
    && apk add --no-cache ca-certificates tzdata \
    && rm -rf /var/cache/apk/*

COPY --from=builder \
    /usr/src/app/target/release/server \
    /usr/src/app/server

WORKDIR /usr/src/app

CMD ["./server"]
