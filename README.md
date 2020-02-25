# jhipster-monolith-dinosaurs

This is just a sandbox to play around with a simple [JHipster](https://www.jhipster.tech/) generated monolith application and
deploy it to various cloud providers and containers.

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

    ./mvnw -Pprod -DskipTests verify jib:dockerBuild
    docker tag <image-id> johnchase/dinosaurs:latest
    docker push johnchase/dinosaurs:latest

You can then run up local instances of the application and database with:

    docker-compose -f src/main/docker/app.yml up -d

You can stop or stop and remove the containers with the following (**Warning: using down will also delete the container and any
saved data**):

    docker-compose -f src/main/docker/app.yml stop

    docker-compose -f src/main/docker/app.yml down

For more advanced production requirements you can also configure your application to run with external [monitoring](https://www.jhipster.tech/monitoring/):

    mkdir docker-compose
    cd docker-compose
    jhipster docker-compose

Answer the questions and add ELK as a monitoring solution to generate a global Docker Compose configuration (_Note: when I first
did this the new files/folders were generated in the project root so I moved them to the docker-compose folder_). You can then
control all the services using commands as previously:

    docker-compose -f docker-compose/docker-compose.yml up -d

    docker-compose -f docker-compose/docker-compose.yml stop

    docker-compose -f docker-compose/docker-compose.yml down

The monitoring can then be accessed via the [JHipster Console](http://localhost:5601).

### Kubernetes

The deployment files for kubernetes can be found in the [kubernetes](https://github.com/RatJuggler/jhipster-monolith-dinosaurs/tree/master/kubernetes)
folder.

I was eventually able to deploy to a local Minikube instance but getting everything configured and working is much harder than
other deployments I tried, even when carefully following the [instructions](https://www.jhipster.tech/kubernetes/). Also note that
this deployment does not include the monitoring option described in the Docker section above.

## Attributions

Sauropod icon from [Twemoji](https://twemoji.twitter.com/content/twemoji-twitter/en.html).

Main image by [KoprX](https://commons.wikimedia.org/wiki/User:KoprX).
