# jhipster-monolith-dinosaurs

This is just a sandbox to play around with a simple [JHipster](https://www.jhipster.tech/) generated monolith application and
deploy it to various cloud providers and containers.

_The original generated README.md has been renamed as [jhipster.md](jhipster.md)._

Currently being regenerated using JHipster [7.0.1](https://www.jhipster.tech/documentation-archive/v7.0.1).

## Generation

The application was originally generated using the JHipster (4.14.1) command line question/response [process](https://www.jhipster.tech/creating-an-app/)
and then a few simple customisations made to the home page and footer. It has been updated on a semi-regular basis to the latest
version. The setup has been consolidated into a [jdl](https://www.jhipster.tech/jdl/) [file](https://github.com/RatJuggler/jhipster-jdl/blob/master/jhipster-monolith-dinosaurs.jdl)
and you can now reproduce the generation (minus customisations) using the following commands:

    mkdir jhipster-monolith-dinosaurs
    cd jhipster-monolith-dinosaurs
    jhipster import-jdl jhipster-monolith-dinosaurs.jdl

## Deployments

The following deployments have been tested for this version of the application.

### Heroku

A Heroku test deployment is currently available [here](https://jhipster-dinosaurs.herokuapp.com/).

The deployment was created and deployed by following [these](https://www.jhipster.tech/heroku/) instructions and updated using:

    ./mvnw package -Pprod -DskipTests
    heroku deploy:jar target/dinosaurs.jar --app jhipster-dinosaurs

### Docker

Following [these](https://www.jhipster.tech/docker-compose/) instructions, first create a docker image and push it to docker hub:

    ./mvnw package -Pprod -DskipTests verify jib:dockerBuild
    docker tag <image-id> johnchase/dinosaurs:latest
    docker push johnchase/dinosaurs:latest

You can then run up local instances of the application and database with:

    docker-compose -f src/main/docker/app.yml up -d

You can stop and remove the containers with the following (**Warning: using down will also delete the container and any
saved data**):

    docker-compose -f src/main/docker/app.yml down

For more advanced production usage see the [docker-compose](https://github.com/RatJuggler/jhipster-monolith-dinosaurs/tree/master/docker-compose)
sub-folder.

Using an environment file (.env) can remove the need to keep specifying file and project options.

### Kubernetes

The deployment files for kubernetes can be found in the [kubernetes](https://github.com/RatJuggler/jhipster-monolith-dinosaurs/tree/master/kubernetes)
folder.

I was eventually able to deploy to a local Minikube instance but getting everything configured and working is much harder than
other deployments I tried, even when carefully following the [instructions](https://www.jhipster.tech/kubernetes/). Also note that
this deployment does not include the monitoring option described in the Docker section above.

## Attributions

Sauropod icon from [Twemoji](https://twemoji.twitter.com/content/twemoji-twitter/en.html).

Main image by [KoprX](https://commons.wikimedia.org/wiki/User:KoprX).
