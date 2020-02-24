# jhipster-monolith-dinosaurs

This is just a sandbox to play around with a simple JHipster generated monolith application and deploy it to various
cloud providers and containers.

_The original generated README.md has been renamed as [jhipster.md](jhipster.md)._

Currently using JHipster [6.7.1](https://www.jhipster.tech/documentation-archive/v6.7.1).

## Generation

The application was originally generated using the JHipster (4.14.1) command line question/response [process](https://www.jhipster.tech/creating-an-app/)
and then a few simple customisations made to the home page and footer. It has been updated on a semi-regular basis to the latest
version. The setup has been consolidated into a [jdl](https://www.jhipster.tech/jdl/) file and you can now reproduce the generation
(minus customisations) using the following commands:

    mkdir jhipster-monolith-dinosaurs
    cd jhipster-monolith-dinosaurs
    jhipster import-jdl jhipster-monolith-dinosaurs.jh

The source for the monolith dinosaurs jdl can be found [here](https://github.com/RatJuggler/jhipster-jdl/blob/master/jhipster-monolith-dinosaurs.jh).

## Deployments

The following deployments have been tested for this version of the application.

### Heroku

A Heroku test deployment is currently available [here](https://jhipster-dinosaurs.herokuapp.com/).

The deployment was created and deployed by following [these](https://www.jhipster.tech/heroku/) instructions and running:

    ./mvnw package -Pprod -DskipTests
    heroku deploy:jar target/dinosaurs.jar --app jhipster-dinosaurs

### Docker

Following [these](https://www.jhipster.tech/docker-compose/) instructions, first create a docker image and push it to docker hub:

    ./mvnw package -Pprod -DskipTests verify jib:dockerBuild
    docker tag <image-id> johnchase/dinosaurs:latest
    docker push johnchase/dinosaurs:latest

You can then run up local instances of the application and database with:

    docker-compose -f src/main/docker/app.yml up -d

To stop and remove the containers use the following (**warning this will also delete all saved data**):

    docker-compose -f src/main/docker/app.yml down

### Kubernetes

The deployment files for kubernetes can be found in the [dinosaurs](https://github.com/RatJuggler/jhipster-monolith-dinosaurs/tree/master/dinosaurs)
folder.

I was eventually able to deploy to a local Minikube instance but getting everything configured and working is much harder than
other deployments I tried even after carefully following the [instructions](https://www.jhipster.tech/kubernetes/).

## Attributions

Sauropod icon from [Twemoji](https://twemoji.twitter.com/content/twemoji-twitter/en.html).

Main image by [KoprX](https://commons.wikimedia.org/wiki/User:KoprX).
