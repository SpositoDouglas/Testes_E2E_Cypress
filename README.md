# Projeto de Testes E2E com Cypress

Este projeto demonstra um fluxo completo de autenticação (cadastro e login) com uma API backend conectada a um banco de dados (SQLite) e um frontend simples. O objetivo principal é ilustrar como aplicar testes End-to-End (E2E) robustos utilizando o Cypress.

## Funcionalidades

* **Frontend:**
    * Página de Cadastro (`/cadastro.html`)
    * Página de Login (`/login.html`)
    * Página Home (`/home.html`)
* **Backend (API REST):**
    * `POST /cadastro`: Cria um novo usuário com senha hasheada (bcrypt).
    * `POST /login`: Autentica um usuário comparando o hash da senha.
* **Testes E2E (Cypress):**
    * `login.cy.js`: Testa o fluxo de login com sucesso, erro e validação de formulário.
    * `cadastro.cy.js`: Testa o fluxo de cadastro com sucesso, erro de email duplicado e validação de formulário.
 
## Estrutura do Projeto
```bash
.
├── cypress/
│   ├── e2e/
│   │   ├── cadastro.cy.js
│   │   └── login.cy.js
│   ├── fixtures/
│   └── support/
│
├── node_modules/
├── .gitignore 
├── cadastro.html
├── cadastro.js
├── cypress.config.js
├── home.html
├── login.html
├── login.js
├── package.json 
├── README.md
├── server.js
└── style.css
```

## Tecnologias Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript (Fetch API)
* **Backend:** Node.js, Express, CORS
* **Banco de Dados:** SQLite3
* **Segurança:** bcryptjs (para hashing de senhas)
* **Testes:** Cypress

---

## Como Executar o Projeto

Para rodar este projeto, você precisará de dois terminais abertos simultaneamente: um para o servidor backend e outro para o Cypress.

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 16 ou superior)

### 1. Instalação

Clone o repositório e instale as dependências usando o comando:

```bash
npm install
```

### 2. Executando

No primeiro terminal, execute o seguinte comando:
```bash
node server.js
```
No segundo terminal, execute o Cypress:
```bash
npx cypress open
```
