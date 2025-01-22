# Django React Project

Este repositório contém uma aplicação web construída com Django no backend e React no frontend. O objetivo é fornecer uma aplicação completa, combinando as melhores práticas de desenvolvimento com ambas as tecnologias.

---

## 🛠️ Tecnologias Utilizadas

- **Backend**: [Django](https://www.djangoproject.com/)
- **Frontend**: [React](https://reactjs.org/)
- **Banco de Dados**: (Especifique aqui, por exemplo, PostgreSQL, SQLite, etc.)
- **Gerenciamento de Pacotes**: 
  - Backend: `pip` e `virtualenv`
  - Frontend: `npm` ou `yarn`

---

## 📋 Funcionalidades


- CRUD de dados no backend com uma API RESTful (usando Django REST Framework).
- Interface interativa e responsiva com React.
- Integração entre o backend e o frontend via API.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Python** (versão X.X ou superior)
- **Node.js** (versão X.X ou superior)
- **Git** instalado no sistema

### Configuração do Backend (Django)

1. Clone o repositório:
   ```bash
   git clone https://github.com/matheuspx/django-react.git
   ```

2. Crie e ative um ambiente virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Para Linux/Mac
   venv\Scripts\activate     # Para Windows
   ```

3. Instale as dependências do backend:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure o banco de dados no arquivo `settings.py`.

5. Execute as migrações do banco de dados:
   ```bash
   python manage.py migrate
   ```

6. Inicie o servidor do backend:
   ```bash
   python manage.py runserver
   ```

### Configuração do Frontend (React)

1. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências do frontend:
   ```bash
   npm install
   ```

3. Inicie o servidor do frontend:
   ```bash
   npm start
   ```

---

## 🛡️ Estrutura do Projeto

```
project-root/
│
├── backend/
│   ├── manage.py
│   ├── db.sqlite3
│   ├── app/  # Aplicação Django
│   ├── settings.py
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

---

## 🌐 URLs

- **Backend API**: `http://127.0.0.1:8000/api/`
- **Frontend**: `http://localhost:3000`

---

## 🖥️ Telas Implementadas (caso aplicável)

- Tela de Login
- Tela de Cadastro
- Dashboard
- Listagem de itens
- Formulário de criação/edição
