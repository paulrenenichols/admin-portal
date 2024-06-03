# admin-portal

## Getting Started

Here's a breakdown of the system requirements necessary to get Admin Portal up and running.

### Node.js

First you'll need [Node.js 20.13.1](https://nodejs.org/en/blog/release/v20.13.1) (or later) installed to be able to run Admin Portal.

I used [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions on my system. If you have `nvm` installed, I have provided an [.nvmrc](https://github.com/paulrenenichols/admin-portal/blob/main/.nvmrc) file in the proejct, and you can run `nvm use` to set the correct version on your machine.

### Docker

Running the project requires that [Docker](https://www.docker.com/) is installed on your machine. I have provided a docker compose file ([docker-compose.dev.yaml](https://github.com/paulrenenichols/admin-portal/blob/main/docker-compose.dev.yaml)) which builds containers and boots up the application.

### Yarn

I'm using [Yarn](https://yarnpkg.com/) as the package manager for this project. This is so that I can manage the different services included as a monorepo. I am used Yarn version 4.

Once you have the correct version of node installed, you can set up Yarn locally by following [the instructions here](https://yarnpkg.com/getting-started/install):

Run `corepack enable`, then you should be ready.

## Running Admin Portal

### Installation

Once you've cloned the repository and installed all of the above tools, you can set up and run the project.

Open up a terminal, and go to the project directory. Then run these steps:

1. `yarn install` (*to install packages*)
2. `yarn start`	(*to build docker images and boot up the app*)

### Using the application

#### Nestjs API Server

The server source code can be viewed [on github here](https://github.com/paulrenenichols/admin-portal/tree/main/services/server).

The api server is build on [Nestjs](https://nestjs.com/).

You can verify the server by going to [http://localhost:3000](http://localhost:3000) in your browser. If the server is up and running, you should see this:

<img src="https://github.com/paulrenenichols/admin-portal/blob/main/readme/server.png"/>

### Admin Portal UI

The admin portal UI is built on [Remix](https://remix.run/).

You can view the portal source code [here on github](https://github.com/paulrenenichols/admin-portal/tree/main/services/portal).

When you have the application up and running you can see the customer list by visiting [http://localhost:5173/customer/](http://localhost:5173/customer/). That looks like:

<img src="https://github.com/paulrenenichols/admin-portal/blob/main/readme/customer-list.png"/>

When you click on a `View` button in the customer list, you will see the customer detail view:

<img src="https://github.com/paulrenenichols/admin-portal/blob/main/readme/customer-detail-view"/>