# Conversor de arquivos CSV para JSONs

<div align="center"></br>
<h4>Back-End</h4>
  <img alt="Typescript badge" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="NodeJS badge" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img alt="Docker badge" src="https://img.shields.io/badge/Docker-3880FF?style=for-the-badge&logo=docker&logoColor=white" />
  <img alt="NestJS badge" src="https://img.shields.io/badge/Nest.JS-EA284C?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img alt="RabbitMQ badge" src="https://img.shields.io/badge/rabbitmq-%23FF6600.svg?&style=for-the-badge&logo=rabbitmq&logoColor=white" />
  <img alt="Socket.IO badge" src="https://img.shields.io/badge/Socket.IO-090020?style=for-the-badge&logo=socket.io&logoColor=white" />
  </br>
  <h4>Front-End</h4>
  Somente para fins de demonstração da aplicação.
  </br>
  <img alt="Socket.IO badge" src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" />
  <img alt="Socket.IO badge" src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" />
  <img alt="Socket.IO badge" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" />
</div></br>

Este projeto é uma aplicação feita em **NestJS** que converte arquivos CSV para JSON de forma simples e eficiente. Usando **RabbitMQ** para gerenciar a fila de pedidos de conversão e **Socket.IO** para notificações em tempo real sobre os pedidos do cliente.

### 🔎🗺️ Se localizando

- **Apresentação estrutural**
	- [**Features**](#features)
	- [**Como usar**](#como-usar)
	- [**Arquitetura**](#design-da-arquitetura)
</br>

- **Ao vivo e em cores**
	- [**Demonstração (Front-End)**](#demonstração-front-end)
</br>

- **Instalando e rodando**
	- [**Docker**](#configuração-do-message-broker-rabbitmq)
	- [**Instalando**](#instalação)
	- [**Rodando**](#rodando-o-app)
</br>

---

## Features

- **Upload de CSV**: Envie um arquivo CSV para ser convertido.
- **Processamento e conversão em tempo real**: Utiliza RabbitMQ para gerenciar a fila de pedidos de conversão.
- **Notificação**: Receba notificações via WebSocket quando a conversão começar e quando estiver concluída.
- **Download de JSON**: Baixe o arquivo JSON convertido.
- **Gerenciamento de arquivos temporários**: Arquivos são excluídos automaticamente após 10 minutos.

## Como usar

1. Faça o upload do arquivo CSV.
2. Aguarde a notificação de que a conversão foi concluída.
3. Baixe o arquivo JSON convertido.

---

## Design da arquitetura

![Arquitetura](./docs/assets/csv-to-json-schema.drawio.png)
<a href="./docs/csv-to-json-schema.drawio">
  <img alt="Socket.IO badge" src="https://img.shields.io/badge/Baixar_esquema_(Draw.io)-DF6C0B?style=for-the-badge&logoColor=white"/>
<a>


## Demonstração (Front-End)

Acesse a aplicação em [http://localhost:3000](http://localhost:3000) para testar a aplicação.

![Demo](./docs/assets/frontend-1.gif)

Exemplo de um arquivo convertido expirado:

![Demo](./docs/assets/frontend-2.png)

---

## Instalação

```bash
$ yarn install
```

## Configuração do Message Broker (RabbitMQ)

```bash
$ docker-compose up -d
```

## Rodando o app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Testando

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
