# MindHub Frontend

Frontend da plataforma MindHub - Interface web para agendamento de consultas psicológicas.

## 📋 Pré-requisitos

### Instalar Node.js

**Node.js 18+** é necessário para executar o projeto.

#### Opção 1: Instalador Oficial

- Download: [https://nodejs.org/](https://nodejs.org/) (recomendado: versão LTS)

#### Opção 2: Via nvm (Node Version Manager)

```bash
# Linux/macOS
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Windows: https://github.com/coreybutler/nvm-windows
```

**Documentação oficial do Node.js**: [https://nodejs.org/docs/](https://nodejs.org/docs/)

## 🚀 Início Rápido

### Passo a Passo Completo

#### 1. Clone o repositório

```bash
git clone https://github.com/gabriellivalelia/mindhub-frontend
cd mindhub-frontend
```

#### 2. Instalar dependências

```bash
npm install
```

#### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8000
```

**Nota**: Certifique-se de que o backend está rodando na porta 8000.

#### 4. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em: `http://localhost:5173`

## 📝 Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento (Vite)
```

## 🌐 Integração com Backend

O frontend consome a API REST do backend MindHub:

**Base URL (desenvolvimento)**: `http://localhost:8000`

**Documentação completa da API**: `http://localhost:8000/docs` (quando o backend estiver rodando)

## 📖 Links Úteis

- **Documentação do React**: [https://react.dev/](https://react.dev/)
- **Documentação do Vite**: [https://vitejs.dev/](https://vitejs.dev/)
- **Documentação do React Router**: [https://reactrouter.com/](https://reactrouter.com/)
- **Documentação do Zustand**: [https://zustand-demo.pmnd.rs/](https://zustand-demo.pmnd.rs/)
- **Documentação do Material UI**: [https://mui.com/](https://mui.com/)
- **Documentação do React Query**: [https://tanstack.com/query/](https://tanstack.com/query/)

## 📄 Licença

Este projeto é parte do trabalho acadêmico da disciplina de Análise, Projeto e Programação Orientados a Objetos - UFMG 2025.2
