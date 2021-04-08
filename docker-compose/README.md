# JHipster generated Docker-Compose configuration

## Usage

For more advanced production requirements you can also [generate](https://www.jhipster.tech/docker-compose/) a global Docker Compose 
configuration to run your application with external [monitoring](https://www.jhipster.tech/monitoring/):

    mkdir docker-compose
    cd docker-compose
    jhipster docker-compose

Answer the questions and add ELK as a monitoring solution to generate the configuration:
 
    ? Which *type* of application would you like to deploy? 
    Monolithic application
    ? Enter the root directory where your applications are located ../..
    1 applications found at /home/john/IdeaProjects/
    ? Which applications do you want to include in your configuration? 
    jhipster-monolith-dinosaurs
    ? Do you want to setup monitoring for your applications ? 
    Yes, for metrics only with Prometheus
 
You can then control all the services using commands as previously:

    docker-compose up -d

    docker-compose stop

    docker-compose start

In addition, using an environment file (.env) can remove the need to keep specifying file and project options.

## Configured Docker services

### Applications and dependencies:

- dinosaurs (monolith application)
- dinosaurs's mysql database

### Additional Services:

- [Prometheus server](http://localhost:9090)
- [Prometheus Alertmanager](http://localhost:9093)
- [Grafana](http://localhost:3000)
