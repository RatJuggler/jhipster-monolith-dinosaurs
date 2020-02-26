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
    ? Enter the root directory where your applications are located ../
    1 applications found at /home/john/IdeaProjects/
    ? Which applications do you want to include in your configuration? 
    jhipster-monolith-dinosaurs
    ? Do you want to setup monitoring for your applications ? 
    Yes, for logs and metrics with the JHipster Console (based on ELK)
    ? You have selected the JHipster Console which is based on the ELK stack and additional technologies, which one do you want to use ? 
    Curator, to help you curate and manage your Elasticsearch indices
 
(_Note: when I first did this the new files/folders were generated in the project root so I moved them to the docker-compose folder_).

You can then control all the services using commands as previously:

    docker-compose up -d

    docker-compose stop

    docker-compose start

In addition using an environment file (.env) can remove the need to keep specifying file and project options.

## Configured Docker services

### Applications and dependencies:

- dinosaurs (monolith application)
- dinosaurs's mysql database

### Additional Services:

- [JHipster Console](http://localhost:5601)
