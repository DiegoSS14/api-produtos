# 🛠️ API de Produtos – Desafio Técnico

Este repositório contém uma aplicação **full-stack** desenvolvida com:

- **Front-end**: Next.js + Tailwind CSS  
- **Back-end**: Express.js + Sequelize + MySQL  
- **Funcionalidades**: Autenticação com JWT, CRUD de produtos  
- **Banco de dados**: MySQL

---

## 📁 Estrutura do Projeto

arduino
Copiar
Editar
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
🚀 Como rodar o projeto
🐳 Com Docker (recomendado)
Certifique-se de ter o Docker e Docker Compose instalados.

Na raiz do projeto, execute:

bash
Copiar
Editar
docker-compose up --build
O front-end estará disponível em: http://localhost:3000
A API estará rodando em: http://localhost:3333

💻 Sem Docker
Backend
Acesse a pasta backend/

Instale as dependências:

bash
Copiar
Editar
npm install
Crie um banco de dados MySQL local com o nome productsapi

Crie um arquivo .env:

env
Copiar
Editar
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=productsapi
DB_PORT=3306
JWT_SECRET=sua_chave_jwt
Execute as migrações:

bash
Copiar
Editar
npx sequelize db:migrate
Rode o servidor:

bash
Copiar
Editar
npm run dev
A API estará disponível em http://localhost:3333

Frontend
Acesse a pasta frontend/

Instale as dependências:

bash
Copiar
Editar
npm install
Crie um arquivo .env.local:

env
Copiar
Editar
NEXT_PUBLIC_API_BASE_URL=http://localhost:3333
PORT=3000
Obs: O prefixo NEXT_PUBLIC_ é obrigatório para expor variáveis ao navegador no Next.js.

Rode o front-end:

bash
Copiar
Editar
npm run dev
O site estará disponível em http://localhost:3000

🔐 Variáveis de Ambiente
Backend (backend/.env)
Variável	Descrição	Exemplo
DB_HOST	Host do banco de dados	localhost
DB_USER	Usuário do banco	root
DB_PASSWORD	Senha do banco	root
DB_NAME	Nome do banco de dados	productsapi
DB_PORT	Porta do banco de dados	3306
JWT_SECRET	Chave para assinatura dos tokens JWT	minha_chave_secreta

Frontend (frontend/.env.local)
Variável	Descrição	Exemplo
NEXT_PUBLIC_API_BASE_URL	URL da API consumida pelo front-end	http://localhost:3333
PORT	Porta que o Next.js irá rodar localmente	3000

🔗 Tecnologias Utilizadas
Front-end: Next.js, Tailwind CSS, Axios, React Hook Form, Zod

Back-end: Express.js, Sequelize, MySQL, JWT, Yup

Ambiente: Docker, Docker Compose

📝 Observações
O front-end não manipula nenhuma credencial sensível diretamente.

As variáveis de ambiente do Next.js devem ser colocadas em .env.local (padrão para variáveis privadas em desenvolvimento).

O sistema está preparado para ser executado tanto em ambiente local quanto em containers, facilitando testes e deploy.

Pronto! Com isso, você já pode iniciar e utilizar o projeto com facilidade. 🚀