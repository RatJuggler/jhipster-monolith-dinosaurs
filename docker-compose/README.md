# JHipster generated Docker-Compose configuration

## Usage

For more advanced production requirements you can also generate a global Docker Compose configuration to run your application with 
external [monitoring](https://www.jhipster.tech/monitoring/):

    mkdir docker-compose
    cd docker-compose
    jhipster docker-compose

Answer the questions and add ELK as a monitoring solution to generate the configuration (_Note: when I first did this the new 
files/folders were generated in the project root so I moved them to the docker-compose folder_). You can then control all the 
services using commands as previously:

    docker-compose up -d

    docker-compose stop

    docker-compose down

Using an environment file (.env) can remove the need to keep specifying file and project options.

## Configured Docker services

### Applications and dependencies:

- dinosaurs (monolith application)
- dinosaurs's mysql database

### Additional Services:

- [JHipster Console](http://localhost:5601)
