'''
# 🚀 NextTalent API - Backend

Backend completo para a plataforma **NextTalent**, desenvolvido com **NestJS**, **Sequelize** e **PostgreSQL**. Esta API é responsável por gerenciar todos os dados da aplicação, incluindo programas, instituições, usuários, inscrições e favoritos, oferecendo uma integração total com o frontend em Next.js.

---

## 📋 Índice

*   [🎯 Funcionalidades](#-funcionalidades)
*   [🛠️ Tecnologias Utilizadas](#-tecnologias-utilizadas)
*   [📦 Como Instalar e Rodar o Projeto](#-como-instalar-e-rodar-o-projeto)
    *   [Pré-requisitos](#pré-requisitos)
    *   [Configuração do Ambiente](#configuração-do-ambiente)
    *   [Instalação](#instalação)
    *   [Banco de Dados](#banco-de-dados)
    *   [Iniciando o Servidor](#iniciando-o-servidor)
*   [📚 Documentação da API (Swagger)](#-documentação-da-api-swagger)
*   [🔐 Autenticação](#-autenticação)
*   [🧪 Testes](#-testes)
*   [🗂️ Estrutura do Projeto](#-estrutura-do-projeto)

---

## 🎯 Funcionalidades

-   **Gerenciamento de Programas:** CRUD completo para programas de formação, incluindo filtros dinâmicos.
-   **Gerenciamento de Instituições:** CRUD para instituições que oferecem os programas.
-   **Autenticação de Usuários:** Integração com Firebase Authentication para login seguro com Google.
-   **Gerenciamento de Usuários:** Perfil do usuário, interesses e preferências.
-   **Sistema de Favoritos:** Permite que usuários salvem seus programas de interesse.
-   **Sistema de Inscrições:** Gerenciamento de inscrições em programas.
-   **Dashboard do Usuário:** Agregação de estatísticas e dados relevantes para o usuário.
-   **Documentação Automatizada:** Geração automática da documentação da API com Swagger.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
| :--- | :--- |
| **NestJS** | Framework Node.js para construir aplicações backend eficientes e escaláveis. |
| **Sequelize** | ORM (Object-Relational Mapper) para Node.js, facilitando a interação com o banco de dados. |
| **PostgreSQL** | Banco de dados relacional robusto e de código aberto. |
| **Swagger (OpenAPI)** | Para documentação interativa e testes de endpoints da API. |
| **Firebase Admin** | Para validação de tokens de autenticação do Firebase no backend. |
| **TypeScript** | Superset do JavaScript que adiciona tipagem estática. |
| **Class-Validator** | Para validação de DTOs (Data Transfer Objects). |
| **Postman** | Para testes manuais e automáticos da API. |

---

## 📦 Como Instalar e Rodar o Projeto

Siga os passos abaixo para configurar e rodar o projeto localmente.

### Pré-requisitos

-   **Node.js** (v18+ recomendado)
-   **npm** ou **yarn**
-   **PostgreSQL** (rodando localmente ou em um container Docker)
-   **Firebase Project** configurado para autenticação

### Configuração do Ambiente

1.  **Clone o repositório:**

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd nexttalent-backend
    ```

2.  **Crie o arquivo de variáveis de ambiente:**

    Copie o arquivo `.env.example` para um novo arquivo chamado `.env`.

    ```bash
    cp .env.example .env
    ```

3.  **Preencha o arquivo `.env` com suas credenciais:**

    ```env
    # Configuração do Banco de Dados
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USERNAME=postgres
    DATABASE_PASSWORD=sua_senha_do_postgres
    DATABASE_NAME=nexttalent

    # Configuração da Aplicação
    PORT=3001
    NODE_ENV=development

    # Configuração do Firebase
    FIREBASE_PROJECT_ID=seu-project-id
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
    FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@...iam.gserviceaccount.com

    # Configuração do CORS
    FRONTEND_URL=http://localhost:3000
    ```

    > **IMPORTANTE:** A `FIREBASE_PRIVATE_KEY` deve ser formatada como uma string de uma única linha, substituindo as quebras de linha por `\n`.

### Instalação

Instale todas as dependências do projeto:

```bash
npm install
# ou
yarn install
```

### Banco de Dados

1.  **Crie o banco de dados `nexttalent`** no seu servidor PostgreSQL.

2.  **Execute as migrations** para criar todas as tabelas:

    ```bash
    npm run migration:run
    ```

3.  **(Opcional) Popule o banco de dados** com dados de teste (seeders):

    ```bash
    npm run seed:run
    ```

### Iniciando o Servidor

Para iniciar o servidor em modo de desenvolvimento (com hot-reload):

```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3001`.

---

## 📚 Documentação da API (Swagger)

Após iniciar o servidor, a documentação completa e interativa da API estará disponível em:

**[http://localhost:3001/api/docs](http://localhost:3001/api/docs)**

Use o Swagger para explorar todos os endpoints, ver os schemas de DTOs e testar as requisições diretamente do navegador.

---

## 🔐 Autenticação

A API utiliza **Firebase Authentication** para proteger rotas. Para acessar endpoints protegidos, siga o fluxo:

1.  **Obtenha um token JWT** do Firebase no seu frontend (após o login com Google).
2.  **Envie o token** no cabeçalho `Authorization` de cada requisição:

    ```
    Authorization: Bearer <SEU_TOKEN_JWT_DO_FIREBASE>
    ```

O backend validará o token a cada requisição para garantir que o usuário está autenticado.

---

## 🧪 Testes

Para executar os testes (unitários e de integração), use os seguintes comandos:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Gerar relatório de cobertura de testes
npm run test:cov
```

---

## 🗂️ Estrutura do Projeto

O projeto segue uma arquitetura modular, organizada da seguinte forma:

```
src/
├── common/         # Código compartilhado (guards, decorators, etc.)
├── config/         # Configurações da aplicação
├── database/       # Migrations e seeders
├── modules/        # Módulos de negócio (Auth, Users, Programs, etc.)
├── app.module.ts   # Módulo principal
└── main.ts         # Ponto de entrada da aplicação
```

Cada módulo de negócio contém sua própria estrutura de `controller`, `service`, `entity` e `dto`, promovendo baixo acoplamento e alta coesão.
'''
