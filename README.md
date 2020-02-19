# jhipster-dinosaurs

This is just a sandbox to play around with a simple JHipster generated monolith application and deploy it to various
cloud providers and containers.

_The original generated README.md has been renamed as [jhipster.md](jhipster.md)._

Currently using JHipster [6.7.1](https://www.jhipster.tech/documentation-archive/v6.7.1).

## Generation

The application was originally generated using the JHipster (4.14.1) command line question/response [process](https://www.jhipster.tech/creating-an-app/)
and then a few simple customisations made to the home page and footer. It has been updated on a semi-regular basis to the latest
version. The setup has been consolidated into a [jdl](https://www.jhipster.tech/jdl/) file and you can now reproduce the generation
(minus customisations) using the following commands:

    mkdir jhipster-dinosaurs
    cd jhipster-dinosaurs
    jhipster import-jdl jhipster-dinosaurs.jh

The source for the dinosaurs jdl can be found in the [RatJuggler/jhipster-jdl](https://github.com/RatJuggler/jhipster-jdl)
repository.

## Deployments

The following deployments have been tested for this version of the application.

### Heroku

A Heroku test deployment is currently available [here](https://jhipster-dinosaurs.herokuapp.com/).

The deployment was created and deployed using the following commands:

    ./mvnw package -Pprod -DskipTests
    heroku deploy:jar target/dinosaurs.jar --app jhipster-dinosaurs

### Docker

Create a docker image and push to docker hub then run up a local instance:

    ./mvnw package -Pprod -DskipTests verify jib:dockerBuild
    docker tag <image-id> johnchase/dinosaurs:latest
    docker push johnchase/dinosaurs:latest
    docker-compose -f src/main/docker/app.yml up -d

## Attributions

Sauropod icon from [Twemoji](https://twemoji.twitter.com/content/twemoji-twitter/en.html).

Main image by [KoprX](https://commons.wikimedia.org/wiki/User:KoprX).
