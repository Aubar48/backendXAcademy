# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.15.1

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Copiar la carpeta downloads al contenedor
COPY downloads /usr/src/app/downloads

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm start
