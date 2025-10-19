# Integração com API Backend - MindHub

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Estrutura de Serviços](#estrutura-de-serviços)
- [Uso Básico](#uso-básico)
- [Autenticação](#autenticação)
- [Hooks Disponíveis](#hooks-disponíveis)
- [Tratamento de Erros](#tratamento-de-erros)
- [CORS e Proxy](#cors-e-proxy)
- [Segurança](#segurança)

## 🎯 Visão Geral

Este projeto usa:

- **axios** - Cliente HTTP com interceptors para auth e tratamento de erros
- **TanStack Query (React Query)** - Cache, sincronização e gerenciamento de estado assíncrono
- **localStorage** - Armazenamento de tokens (considere httpOnly cookies em produção)

## 📦 Instalação

As dependências já foram instaladas:

```bash
npm install axios @tanstack/react-query
```

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000/api
```

Para produção, ajuste para a URL real da API:

```env
VITE_API_URL=https://api.mindhub.com/api
```

### 2. Proxy de Desenvolvimento (Opcional)

O `vite.config.js` já está configurado com proxy para `/api`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
}
```

## 📁 Estrutura de Serviços

```
src/services/
├── api.js                  # Cliente HTTP axios + interceptors
├── authService.js          # Serviço de autenticação
├── useAppointments.js      # Hooks para consultas/agendamentos
├── useContents.js          # Hooks para conteúdos educacionais
└── usePsychologists.js     # Hooks para psicólogos e disponibilidades
```

## 🚀 Uso Básico

### Exemplo 1: Listar consultas

```jsx
import { useAppointments } from "../services/useAppointments";

function AppointmentsPage() {
  const { data, isLoading, error } = useAppointments({
    status: "Confirmado",
    page: 1,
    limit: 10,
  });

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      {data.items.map((appointment) => (
        <div key={appointment.id}>{appointment.date}</div>
      ))}
    </div>
  );
}
```

### Exemplo 2: Criar nova consulta

```jsx
import { useCreateAppointment } from "../services/useAppointments";

function BookingForm() {
  const createAppointment = useCreateAppointment();

  const handleSubmit = async (formData) => {
    try {
      await createAppointment.mutateAsync(formData);
      alert("Consulta criada com sucesso!");
    } catch (error) {
      alert("Erro ao criar consulta: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* campos do formulário */}
      <button type="submit" disabled={createAppointment.isPending}>
        {createAppointment.isPending ? "Salvando..." : "Agendar"}
      </button>
    </form>
  );
}
```

### Exemplo 3: Login

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await authService.login(
      credentials.email,
      credentials.password
    );

    if (result.success) {
      navigate("/home");
    } else {
      alert(result.error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
```

## 🔐 Autenticação

### Fluxo de Autenticação

1. **Login**: `authService.login(email, password)`
   - Backend retorna `{ accessToken, user }`
   - Token é salvo no localStorage
   - User type e email são salvos

2. **Requisições Autenticadas**:
   - Interceptor adiciona automaticamente `Authorization: Bearer <token>`

3. **Refresh de Token** (401):
   - Ao receber 401, interceptor chama `/auth/refresh`
   - Se sucesso, retenta requisição original
   - Se falha, redireciona para login

4. **Logout**: `authService.logout()`
   - Limpa tokens do localStorage
   - Opcionalmente invalida refreshToken no backend

### Armazenamento de Tokens

**Atual (localStorage)**:

```javascript
// src/utils/auth.js
setToken(accessToken);
getToken();
removeToken();
```

**Recomendado para Produção**:

- **Access Token**: Em memória (variável) ou sessionStorage
- **Refresh Token**: httpOnly cookie (mais seguro contra XSS)

## 🎣 Hooks Disponíveis

### Consultas (useAppointments.js)

| Hook                         | Descrição                   | Tipo     |
| ---------------------------- | --------------------------- | -------- |
| `useAppointments(params)`    | Lista consultas com filtros | Query    |
| `useAppointment(id)`         | Busca consulta específica   | Query    |
| `useCreateAppointment()`     | Cria nova consulta          | Mutation |
| `useUpdateAppointment()`     | Atualiza consulta           | Mutation |
| `useCancelAppointment()`     | Cancela consulta            | Mutation |
| `useConfirmPayment()`        | Confirma pagamento          | Mutation |
| `useRescheduleAppointment()` | Reagenda consulta           | Mutation |

### Conteúdos (useContents.js)

| Hook                  | Descrição                 | Tipo     |
| --------------------- | ------------------------- | -------- |
| `useContents(params)` | Lista conteúdos           | Query    |
| `useContent(id)`      | Busca conteúdo específico | Query    |
| `useCreateContent()`  | Cria conteúdo             | Mutation |
| `useUpdateContent()`  | Atualiza conteúdo         | Mutation |
| `useDeleteContent()`  | Deleta conteúdo           | Mutation |

### Psicólogos (usePsychologists.js)

| Hook                            | Descrição                  | Tipo     |
| ------------------------------- | -------------------------- | -------- |
| `usePsychologists(params)`      | Lista psicólogos           | Query    |
| `usePsychologist(id)`           | Busca psicólogo específico | Query    |
| `useAvailabilities(id, params)` | Busca disponibilidades     | Query    |
| `useUpdateAvailabilities()`     | Atualiza disponibilidades  | Mutation |

## ⚠️ Tratamento de Erros

O cliente axios (`src/services/api.js`) já trata erros automaticamente:

```javascript
// Erros de rede
{ code: 'NETWORK_ERROR', message: 'Falha na conexão...' }

// 401 - Não autorizado (tenta refresh automático)
// 403 - Sem permissão
{ code: 'FORBIDDEN', message: 'Você não tem permissão...', status: 403 }

// 404 - Não encontrado
{ code: 'NOT_FOUND', message: 'Recurso não encontrado.', status: 404 }

// 500+ - Erro do servidor
{ code: 'SERVER_ERROR', message: 'Erro no servidor...', status: 500 }

// Outros erros
{ code: 'API_ERROR', message: '...', status: xxx, data: {...} }
```

## 🌐 CORS e Proxy

### Desenvolvimento Local

**Opção 1: Proxy Vite** (já configurado)

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
}
```

Use URLs relativas: `/api/appointments`

**Opção 2: CORS no Backend**

Configure o backend para aceitar `http://localhost:5173`:

```javascript
// Express.js exemplo
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
```

### Produção

Configure CORS para aceitar apenas domínios confiáveis:

```javascript
app.use(
  cors({
    origin: "https://mindhub.com",
    credentials: true,
  })
);
```

## 🔒 Segurança

### ✅ Boas Práticas Implementadas

- ✅ Timeout de 30s nas requisições
- ✅ Retry automático (até 2 vezes)
- ✅ Interceptor de refresh token
- ✅ Tratamento centralizado de erros
- ✅ Limpeza de tokens no logout

### 🚨 Melhorias Recomendadas para Produção

1. **Tokens em httpOnly Cookies**

   ```javascript
   // Backend: Set-Cookie: refreshToken=...; HttpOnly; Secure; SameSite=Strict
   // Frontend: não precisa armazenar, browser envia automaticamente
   ```

2. **CSRF Protection**

   ```javascript
   // Backend gera token CSRF
   // Frontend envia em header X-CSRF-Token
   ```

3. **Rate Limiting**
   - Limite tentativas de login (3-5 por minuto)
   - Throttle de API calls

4. **Sanitização de Dados**
   - Valide e sanitize inputs no backend
   - Use bibliotecas como DOMPurify no frontend para conteúdo HTML

5. **HTTPS Obrigatório**
   - Sempre use HTTPS em produção
   - Adicione HSTS headers

6. **Rotação de Refresh Tokens**
   ```javascript
   // Cada refresh gera novo refreshToken
   // Invalida o anterior
   ```

## 🧪 Testando a Integração

### 1. Inicie o backend (se disponível)

```bash
# Exemplo (ajuste conforme seu backend)
cd ../backend
npm run dev
```

### 2. Configure a URL da API

```bash
# .env.local
VITE_API_URL=http://localhost:3000/api
```

### 3. Inicie o frontend

```bash
npm run dev
```

### 4. Teste endpoints

Use o DevTools (Network tab) para verificar:

- ✅ Requisições vão para URL correta
- ✅ Header `Authorization` está presente
- ✅ Refresh automático funciona no 401
- ✅ Cache do TanStack Query está ativo

## 📚 Recursos Adicionais

- [Axios Docs](https://axios-http.com/)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Vite Proxy Config](https://vitejs.dev/config/server-options.html#server-proxy)
- [OWASP Security](https://owasp.org/www-project-web-security-testing-guide/)

## 🤝 Próximos Passos

1. Implementar backend endpoints conforme contratos definidos
2. Testar todos os fluxos (login, CRUD, refresh)
3. Adicionar testes unitários com MSW (Mock Service Worker)
4. Implementar httpOnly cookies para produção
5. Configurar CI/CD com validação de segurança
