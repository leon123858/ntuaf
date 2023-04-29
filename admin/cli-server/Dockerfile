# Use the official Node.js 18 image.
FROM node:18

# set Timezone as cloud run always run in UTC + 0
ENV TZ=Asia/Taipei
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y tzdata

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install global dependencies.
RUN npm i -g @funboxteam/optimizt

# Copy local code to the container image.
RUN yarn
COPY ./ntuaf-cli ./ntuaf-cli
COPY ./cli-server ./cli-server

# install global tool
WORKDIR /usr/src/app/ntuaf-cli
RUN yarn build
RUN yarn globalInstall

# install server dependence
WORKDIR /usr/src/app/cli-server
RUN yarn

EXPOSE 8080
# Run the web service on container startup.
CMD [ "yarn", "start" ]