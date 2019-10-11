# jhipster-dinosaurs

This is just a sandbox to play around with a simple JHipter generated monolith application and deploy it to various
cloud providers and containers.

_The original generated README.md has been renamed as [jhipster.md](jhipster.md)._

## Generation

The application was generated using the following commands:

    md jhipster-dinosaurs
    cd jhipster-dinosaurs
    jhipster
    jhipster import-jdl jhipster-dinosaurs.jh

With these responses to the JHipster generation questions (responses updated for version 6.3.1):

    ? Which *type* of application would you like to create? Monolithic application (recommended for simple projects)
    ? What is the base name of your application? dinosaurs
    ? What is your default Java package name? com.rj.dinosaurs
    ? Do you want to use the JHipster Registry to configure, monitor and scale your application? No
    ? Which *type* of authentication would you like to use? JWT authentication (stateless, with a token)
    ? Which *type* of database would you like to use? SQL (H2, MySQL, MariaDB, PostgreSQL, Oracle, MSSQL)
    ? Which *production* database would you like to use? MySQL
    ? Which *development* database would you like to use? H2 with disk-based persistence
    ? Do you want to use the Spring cache abstraction? Yes, with the Ehcache implementation (local cache, for a single node)
    ? Do you want to use Hibernate 2nd level cache? Yes
    ? Would you like to use Maven or Gradle for building the backend? Maven
    ? Which other technologies would you like to use? (none selected)
    ? Which *Framework* would you like to use for the client? Angular
    ? Would you like to use a Bootswatch theme (https://bootswatch.com/)? Default JHipster
    ? Would you like to enable internationalization support? No
    ? Besides JUnit and Karma, which testing frameworks would you like to use? Gatling, Cucumber, Protractor
    ? Would you like to install other generators from the JHipster Marketplace? No

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
