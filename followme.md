# Preflight

1. Install nvm: https://github.com/creationix/nvm#install-script
2. Install node/npm: https://nodejs.org/en/
3. Install docker: https://docs.docker.com/engine/installation/
4. Create a slack account
5. Setup your github account
6. Fork https://github.com/feliun/microservices-school

# Introduction

## Node JS Introduction

### A systemic-based service

```
cd basic-microservice
npm i
npm run start
curl http://localhost:3000/__/manifest
```

### in-memory RESTful API for recipes

```
cd recipes-api
npm i
npm t
```
- [Basic setup](https://github.com/feliun/microservices-school/commit/7f8ea46f69017f2b3748313fdabbe98d1d91b792)
- [Choosing store: strategy pattern](https://github.com/feliun/microservices-school/commit/910cb1283606d6d95ba71dd822501001d8942a71)
- [In-memory store](https://github.com/feliun/microservices-school/commit/8b07859deb97d5d98a3ae230b6af74923772e50f)
- [Recipes API + tests](https://github.com/feliun/microservices-school/commit/12ecc27016a67a05e51a43c6853786857a04d0db)
- [Optimistic control based on versions](https://github.com/feliun/microservices-school/commit/8949ea7119156e4eb6e279aa75f770545daa144f)

# Interaction & comunication

## Mongo Introduction

### Mongo RESTful API for recipes
- [Docker config](https://github.com/feliun/microservices-school/commit/829bbc3ced32e701136f94f55c9f0344abfcd377)
- [Adding mongo systemic component](https://github.com/feliun/microservices-school/commit/2deb5b311ee785781d20c098f55a52d32ec5e5a4)
- [Mongo store + tests](https://github.com/feliun/microservices-school/commit/5423f7f0f9c0acd358e8181bcc988e5434e26a1d)
- [Refactor: proxy store](https://github.com/feliun/microservices-school/commit/77b26f343442a9c45f1c029a462db54a776bfc15)
- [Refactor: multiple automatic tests](https://github.com/feliun/microservices-school/commit/ef2eb0d9e000dc63fbab2dce4c761ef089c4d28f)

## RabbitMQ Introduction

### Publishing conclusions
- [Docker config](https://github.com/feliun/microservices-school/commit/efbec01dde74d9ae07a190c801166367660d9da1)
- [Wiring up rabbitmq](https://github.com/feliun/microservices-school/commit/de850c4a9e45aef527e3b0fdb5a7c0d726a9f250)
- [Publishing conclusions on every store action](https://github.com/feliun/microservices-school/commit/a466f9d5d08f510a18919ae3bd94f0965ffe1c59)
- [Subscribing to conclusions to test published messages](https://github.com/feliun/microservices-school/commit/9035623f0742660f56430bfa5437a74e5cc61599)

## Building a recipes crawler

### Recipe crawler
```
mkdir recipes-crawler
cp -r basic-microservice/* recipes-crawler/ && cp -r basic-microservice/.* recipes-crawler/
rm -rf node_modules/
nvm use && npm i
npm t
```
- [Initial commit](https://github.com/feliun/microservices-school/commit/4aa6fb767a751480eeccb667d2bccd73f4e70228)
- [Docker config](https://github.com/feliun/microservices-school/commit/2851c9323f9fd4d794f37091735777c1d4dfca1b)
- [Wiring up rabbitmq](https://github.com/feliun/microservices-school/commit/cf5b166f2f69c20bfa60bb4f30d4bdb0bc68f326)
- [Basic crawler set up](https://github.com/feliun/microservices-school/commit/072825d0bee2e3e46a21963d109a3bcd49b65130)
- [Using config](https://github.com/feliun/microservices-school/commit/cd5b8f8342c24e6adf85572415511cb5fb377dff)
- [Crawling recipes from the source](https://github.com/feliun/microservices-school/commit/1e2005bc386435a3ced034b59d3572278c9b01a3)
- [Preparation for tests](https://github.com/feliun/microservices-school/commit/d2cde89e0405713e18f2a77e50603ac8083e4347)
- [Testing crawling](https://github.com/feliun/microservices-school/commit/52a55c751d130242c2db977a5f60eefe93a33705)

### Wiring up both services
- [Subsystem to initialise subscriptions](https://github.com/feliun/microservices-school/commit/1e87161d2d073e9cd42505a59bb8618a1f72c261)
- [Rabbit config to subscribe to crawler](https://github.com/feliun/microservices-school/commit/3711a1d05f96a31f8b373e4165be976b66fa6746)
- [Subscribing to crawled recipes](https://github.com/feliun/microservices-school/commit/a5468ce5750a8c6b9c1351211467f12ff2c4d787)

### Testing locally
- Create your own spy queue and check mongo content
- [First architecture problem: we need our own ids](https://github.com/feliun/microservices-school/commit/3ec8c312f7468689b537ef4d77aae214979a9773)
- [Errors handling - recoverable, irrecoverable, absolved](https://github.com/feliun/microservices-school/commit/caaf2b38121591366fbe799a9c40eb358705883e)

# DevOps

## Continuos integration (commit, build, test, brand, package, archive)
- Setting up travis for our project
- [Basic CI pipeline using Makefile: COMMIT, BUILD, TEST](https://github.com/feliun/microservices-school/commit/09ee8ba01300d70ef557694aa3d432c7a81708a6), outcome could be check [here](https://travis-ci.org/feliun/microservices-school/builds/252189365) - you might need to add `sleep 5` after `ensure-dependencies` if Travis is flaky
- [Adding linting to qa process](https://github.com/feliun/microservices-school/commit/590035a42f7eab7ebca6dff67ac61e8d815da4b6) and [a small fix](https://github.com/feliun/microservices-school/commit/5427a38c41e6740cad25709d22331600ff91f864)
- [Brand step](https://github.com/feliun/microservices-school/commit/3d2e01d008d1e831220e756d441f721bb8ea7bf4)
- [Add docker login](https://github.com/feliun/microservices-school/commit/62197436c1bb18e9828d53c0f609647ecd3a20a0)
- [Package step using Dockerfiles](https://github.com/feliun/microservices-school/commit/db5d8b1bef578817c6002f93afc07255e72f5968). Build output could be seen [here](https://travis-ci.org/feliun/microservices-school/builds/252595747)
- Saving building time. Building a basic image from a [different repository](https://github.com/feliun/docker-nvm-yarn/commit/1dccb1a679d9a3aa71efe30cde3e24f1a6fcbb8e). Some instructions [here](https://github.com/feliun/docker-nvm-yarn#docker-nvm-yarn). The build output could be seen [here](https://quay.io/repository/feliun/docker-nvm-yarn/build/a5c5ecdd-fea8-436e-9898-dfb2ac60eeba). The image could be retrieved by doing `docker pull quay.io/feliun/docker-nvm-yarn`.
- [Simpler build as docker is in charge of installation, nvm management etc](https://github.com/feliun/microservices-school/commit/b7d8440b5525037b39a651aaf74714a5a04bc3e9)
- [Still not ready for previous step. We need to replace tests as well first](https://github.com/feliun/microservices-school/commit/4eed25035e34c4589ac7f52dfcac64bb0f0734a9)
- Making it faster: running tests inside container [here](https://github.com/feliun/microservices-school/commit/29e0ee35fea4dd458d3a94d8a6748495685fcd7a) and [here](https://github.com/feliun/microservices-school/commit/e122515d7321c3f50f3851673d29db2e106a48a8). This could be seen [in this build](https://travis-ci.org/feliun/microservices-school/builds/253291881).
- Fix for the brand step [here](https://github.com/feliun/microservices-school/commit/26f112be3b55e0c446dfc9c49b563a05be5f28f5) and [here](https://github.com/feliun/microservices-school/commit/444e35a168c819f5a6c447c676429ab9f38d4607).
- Last step: [archiving the artefact](https://github.com/feliun/microservices-school/commit/6faae4e62912794ebd4a8d28059b6c869cb5efb6) and [enabling it in the build](https://github.com/feliun/microservices-school/commit/1f7ffb977a8d6b000b330aad67dc3d7c4039b1c6) and a [fix](https://github.com/feliun/microservices-school/commit/fadb27a833274ea5a4149d611ef64578c4b51503).Build could be checked [here](https://travis-ci.org/feliun/microservices-school/builds/253555540).
- Checking containers [here](https://github.com/feliun/microservices-school/commit/dd1a2f57d9871aa21413c00dfcc56e06b6b2b65d) and [missing command here](https://github.com/feliun/microservices-school/commit/31c0cc8793a5b3063656beb8a07d9b5775cf4bcc).
- [Fixing port allocation](https://github.com/feliun/microservices-school/commit/2cc5a893414a2061e5c92665ea67b93c80ef599c)
- [Using build.json to test in CI, live.json to start the container](https://github.com/feliun/microservices-school/commit/bb9cf881cd9b8333303de115626773d28a79766f) and another [fix](https://github.com/feliun/microservices-school/commit/0c8cf8027bae8b1bfb54536153af40f0e569dd70).
- [Adding slack integration for notifications](https://github.com/feliun/microservices-school/commit/f94577d67c1d8706be2207ab84c98887d41ff150)

## Continuos Deployment
- Preparing live instance for mongo [here](https://github.com/feliun/microservices-school/commit/9a715f43cf8bfc534078b03b2ee13c07e5f8bc3f). Create your account here: https://mlab.com
- Preparing live instance for rabbitmq [here](https://github.com/feliun/microservices-school/commit/e7fe1a99303dae575cf4601269f80a08b7582439). Create your account here: https://www.cloudamqp.com/
- [Preparing EC2 instance](https://github.com/feliun/microservices-school/commit/f456141230c4c50a16ff60f8059cbef2e5dac59f)
- Deployment starts [here](https://github.com/feliun/microservices-school/blob/master/.travis.yml#L38). This uses [this main script](https://github.com/feliun/microservices-school/blob/master/Makefile#L38-L42) and [a file like this on each project(https://github.com/feliun/microservices-school/blob/master/recipes-api/infra/deploy.sh).

## Check-ins after deployment
1. Create a spy queue
2. Enter docker container for recipes-crawler `docker exec -it recipes-crawler bash`
3. Change config so the service starts immediately
4. Check the spy queue
5. Check the mongo collection
6. Enter docker container for recipes-crawler and check logs in /var/log/supervisor

## Logging
- Create a free account in https://www.sumologic.com
- Add sumo to your service [like this](https://github.com/feliun/microservices-school/commit/c0fe69cca7838e57c9decc6e77cc170f97ec8b30)
- Few logging strategies implemented [here](https://github.com/feliun/microservices-school/tree/master/recipes-id-generator/components/generators/strategies).

# Fixing an architectural issue

## Creating a infrastructure microservice: ID generator
- Check out its code [here](https://github.com/feliun/microservices-school/tree/master/recipes-id-generator)
- recipes-crawler to use the id generator if recipe is repeated: https://github.com/feliun/microservices-school/commit/0f210204a6142b08b633a4d5c80e068ef7d2e401
- recipes-api to support getting recipes by source id: https://github.com/feliun/microservices-school/commit/21a0215a22b66c0846aa8d66559fa3705f220b28

# By Branches

## all-services-developed

## devops1
### [CI: basic pipeline - commit, build, test](https://github.com/feliun/microservices-school/commit/83d3d449aae450891e9e9d580d5a7c8aecd4504d)
### [CI: running lint as part of the qa process](https://github.com/feliun/microservices-school/commit/70c6a79f8b7d61fefc5b12aef39fadd2ca7b9f25)
### [Installing prod and dev dependencies](https://github.com/feliun/microservices-school/commit/6bc9f259a0271a87ce2f61b26a7dc0eea87fe79d)
### [Giving some time to docker containers](https://github.com/feliun/microservices-school/commit/9ca77b28fb2db94fb5f5bab1dff1c55b2e7c3c00)
### [Brand step](https://github.com/feliun/microservices-school/commit/2f322b5c7a4edbb781f853adbb34431d5c0b9545)

## devops-2-docker
### [CI: logging into quay.io to be able to build](https://github.com/feliun/microservices-school/commit/dd11b848e1d0c9a07a58c6e698cabe8aa7f2ce33)
### [Package step using Dockerfiles](https://github.com/feliun/microservices-school/commit/903ebff460a9cccb362582db214690cea6f5a30e)
### [Simpler and faster build reusing the base image](https://github.com/feliun/microservices-school/commit/a63bfc3f57a950e5cc93b18b32c2bf88ba907466)
### [Refining package step](https://github.com/feliun/microservices-school/commit/317b5dbb9e3edfa442ad725360a1fc68f3276303)
### [Running tests inside container](https://github.com/feliun/microservices-school/commit/bc337034ed33053c17c20f8694c52c98ade19283)
### [Archiving new version artefact](https://github.com/feliun/microservices-school/commit/2ee6de0a8175fda83f1cded00a26e019e5b79945)
### [Defining start for each service](https://github.com/feliun/microservices-school/commit/442794c318e3f71b104fa78569eedf8ca003f147)
### [Checking services are up and running](https://github.com/feliun/microservices-school/commit/df13574494d04ecf3a804a0147b486237e045cdc)
### [Adding slack notifications](https://github.com/feliun/microservices-school/commit/8af9c5ed2eeef4cf52e2c861ef1bb75e566d24fd)
### [Cleaner Makefile using export variables](https://github.com/feliun/microservices-school/commit/865ccf40f6bcb6f72b9b0a8ccb857ab08339920b)
