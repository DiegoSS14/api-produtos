# 🛠️ API de Produtos – Desafio Técnico

Este repositório contém uma aplicação **full-stack** com as seguintes tecnologias:

- **Front-end:** Next.js + Tailwind CSS  
- **Back-end:** Express.js + Sequelize + MySQL  
- **Funcionalidades:** Autenticação via JWT, CRUD de produtos  
- **Banco de dados:** MySQL

---

## 📁 Estrutura do Projeto

```
.
├── backend
│   ├── src
│   ├── config
│   ├── models
│   ├── migrations
│   ├── seeders
│   └── .env
│
├── frontend
│   ├── public
│   ├── src
│   └── .env.local
│
└── docker-compose.yml
```

---

## 🚀 Como rodar o projeto

### 🐳 Utilizando Docker (Recomendado)

Certifique-se de ter o **Docker** e **Docker Compose** instalados.

Na raiz do projeto, execute:

```bash
docker-compose up --build
```

- O front-end estará disponível em: [http://localhost:3000](http://localhost:3000)
- A API estará rodando em: [http://localhost:3333](http://localhost:3333)

---

### 💻 Sem Docker

#### Backend

1. Acesse a pasta `backend/`:

    ```bash
    cd backend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Crie um banco de dados MySQL local com o nome `productsapi`.

4. Crie um arquivo `.env` com o seguinte conteúdo:

    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=root
    DB_NAME=productsapi
    DB_PORT=3306
    JWT_SECRET=sua_chave_jwt
    ```

5. Execute as migrações:

    ```bash
    npx sequelize db:migrate
    ```

6. Rode o servidor:

    ```bash
    npm run dev
    ```

- A API estará disponível em [http://localhost:3333](http://localhost:3333)

---

#### Frontend

1. Acesse a pasta `frontend/`:

    ```bash
    cd frontend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Crie um arquivo `.env.local` com o seguinte conteúdo:

    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:3333
    PORT=3000
    ```

    > **Obs:** O prefixo `NEXT_PUBLIC_` é obrigatório para expor variáveis ao navegador no Next.js.

4. Rode o front-end:

    ```bash
    npm run dev
    ```

- O site estará disponível em [http://localhost:3000](http://localhost:3000)

---

## 🔐 Variáveis de Ambiente

### Backend (`backend/.env`)

| Variável      | Descrição                       | Exemplo                |
|---------------|---------------------------------|------------------------|
| DB_HOST       | Host do banco de dados          | localhost              |
| DB_USER       | Usuário do banco                | root                   |
| DB_PASSWORD   | Senha do banco                  | root                   |
| DB_NAME       | Nome do banco de dados          | productsapi            |
| DB_PORT       | Porta do banco de dados         | 3306                   |
| JWT_SECRET    | Chave para assinatura do JWT    | minha_chave_secreta    |

### Frontend (`frontend/.env.local`)

| Variável                  | Descrição                              | Exemplo                       |
|---------------------------|----------------------------------------|-------------------------------|
| NEXT_PUBLIC_API_BASE_URL  | URL da API consumida pelo front-end    | http://localhost:3333         |
| PORT                      | Porta do Next.js localmente            | 3000                          |

---

## 🔗 Tecnologias Utilizadas

- **Front-end:** Next.js, Tailwind CSS, Axios, React Hook Form, Zod
- **Back-end:** Express.js, Sequelize, MySQL, JWT, Yup
- **Ambiente:** Docker, Docker Compose

---

## 📝 Observações

- O front-end não manipula credenciais sensíveis diretamente.
- As variáveis de ambiente do Next.js devem ser colocadas em `.env.local` (padrão para variáveis privadas em desenvolvimento).
- O sistema pode ser executado tanto localmente quanto em containers, facilitando testes e deploy.

Pronto! Agora você pode iniciar e utilizar o projeto facilmente. 🚀