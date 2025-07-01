

<h2>Projeto: Sistema de Gestão para Escola de Idiomas</h2>

Visão Geral
A aplicação consiste em:


Backend: Uma API RESTful desenvolvida com Java e Spring Boot, responsável por toda a lógica de negócio e persistência de dados.

Frontend: Uma aplicação Single-Page Application (SPA) desenvolvida com Angular que consome a API do backend para fornecer uma interface interativa para os usuários.


Banco de Dados: PostgreSQL (obrigatório para o ambiente de produção).

Tecnologias Utilizadas
Backend:

Java 17

Spring Boot 3

Spring Data JPA

Maven

PostgreSQL  / H2

Frontend:

Angular 18

TypeScript

Angular Material

Node.js

Testes:

JUnit 5 (Unitários Backend)

Mockito (Mocking Backend)

Karma/Jasmine (Unitários Frontend)

Cypress / Playwright (E2E - Requisito) 

DevOps:

Docker 

SonarQube (Análise de Qualidade - Requisito) 

📄 Configuração e Execução do Projeto (RQNF11 e RQNF2)
Para garantir a portabilidade e atender ao requisito 

RQNF2, a forma recomendada para executar o projeto é utilizando Docker.

Pré-requisitos
Docker e Docker Compose

Git

Execução com Docker (Recomendado)
Clone o repositório:

Bash

git clone <URL_DO_SEU_REPOSITORIO>
cd <PASTA_DO_PROJETO>
Crie os Dockerfiles:

backend/Dockerfile

Dockerfile

# Estágio de build
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Estágio de execução
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
frontend/Dockerfile

Dockerfile

# Estágio de build
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio de produção
FROM nginx:alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
# Se necessário, copie uma configuração customizada do Nginx
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
Crie o arquivo docker-compose.yml na raiz do projeto:

YAML

version: '3.8'

services:
  db:
    image: postgres:13
    container_name: escola-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: sua_senha_segura
      POSTGRES_DB: escola_idiomas_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    container_name: escola-backend
    depends_on:
      - db
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/escola_idiomas_db
      - SPRING_DATASOURCE_USERNAME=postgres
      - SPRING_DATASOURCE_PASSWORD=sua_senha_segura
      - SPRING_JPA_HIBERNATE_DDL_AUTO=update # Para desenvolvimento. O ideal é usar migrations.

  frontend:
    build: ./frontend
    container_name: escola-frontend
    ports:
      - "4200:80"
    depends_on:
      - backend

volumes:
  postgres_data:
Suba os contêineres:

Bash

docker-compose up --build
Acesse a aplicação:

Frontend: http://localhost:4200

Backend API: http://localhost:8080/api