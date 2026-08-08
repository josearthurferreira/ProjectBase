# 🚀 Template Full-Stack: FastAPI + React + PostgreSQL

Um boilerplate (monorepo) pronto para produção, construído com as melhores práticas para acelerar o desenvolvimento de aplicações web modernas.

## 🛠️ Stack Tecnológica

* **Backend:** Python 3, FastAPI, SQLAlchemy, Uvicorn.
* **Frontend:** React 18, TypeScript, Vite, Axios.
* **Infraestrutura/DB:** Docker, PostgreSQL 16, pgAdmin4.

---

## 📂 Estrutura do Projeto

```text
├── backend/            # API REST com arquitetura separada (rotas, models, schemas)
├── client/             # Interface SPA com React e Vite
├── docker-compose.yml  # Orquestração do banco de dados e pgAdmin local
└── README.md
```

---

## ⚙️ Como executar o projeto localmente

### 1. Pré-requisitos
Certifique-se de ter instalado em sua máquina:
* [Python 3.10+](https://www.python.org/)
* [Node.js 18+](https://nodejs.org/)
* [Docker e Docker Compose](https://www.docker.com/)

### 2. Subir o Banco de Dados
Na raiz do projeto, inicie os containers do PostgreSQL e pgAdmin:
```bash
docker-compose up -d
```
*O pgAdmin estará disponível em `http://localhost:5050` (Login: `admin@admin.com` / Senha: `adminpassword`).*

### 3. Configurar e Rodar o Backend
Abra um terminal e entre na pasta do backend:
```bash
cd backend
```

Crie o ambiente virtual e ative:
```bash
python -m venv venv
source venv/bin/activate  # No Windows use: venv\Scripts\activate
```

Instale as dependências:
```bash
pip install -r requirements.txt
```

Crie um arquivo `.env` na pasta `backend` com a URL do banco:
```env
DATABASE_URL=postgresql://admin:adminpassword@localhost:5432/meubanco
```

Inicie a API:
```bash
uvicorn app.main:app --reload
```
*A documentação interativa (Swagger) estará em `http://localhost:8000/docs`.*

### 4. Configurar e Rodar o Frontend
Abra um **novo terminal** e entre na pasta do cliente:
```bash
cd client
```

Instale os pacotes:
```bash
npm install
```

Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
*Acesse a aplicação em `http://localhost:5173`.*