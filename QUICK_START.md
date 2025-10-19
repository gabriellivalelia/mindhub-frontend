# 🚀 Guia Rápido - Testando a Integração com API

## ✅ O que foi configurado

1. ✅ Instalado `axios` e `@tanstack/react-query`
2. ✅ Criado cliente HTTP com interceptors (`src/services/api.js`)
3. ✅ Criado serviço de autenticação (`src/services/authService.js`)
4. ✅ Criados hooks para consultas, conteúdos e psicólogos
5. ✅ Configurado QueryClientProvider no `main.jsx`
6. ✅ Configurado proxy do Vite para `/api`
7. ✅ Criado arquivo `.env` com `VITE_API_URL`

## 📋 Próximos Passos

### 1. Configure a URL da API

O arquivo `.env` já foi criado com:

```env
VITE_API_URL=http://localhost:3000/api
```

**Ajuste conforme necessário** se seu backend estiver em outra porta ou URL.

### 2. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

### 3. Teste a integração

#### Opção A: Com backend real rodando

Se você tem um backend Node.js/Express/etc rodando:

```bash
# Terminal 1 - Backend
cd ../backend  # ou caminho do seu backend
npm run dev

# Terminal 2 - Frontend
cd mindhub-frontend
npm run dev
```

Depois abra o navegador e:

- Abra DevTools (F12) → Network tab
- Tente fazer login ou carregar dados
- Verifique se as requisições vão para `http://localhost:3000/api`

#### Opção B: Sem backend (testar estrutura)

Você pode testar a estrutura criada importando os hooks em qualquer componente:

```jsx
// Em src/pages/home/index.jsx (exemplo)
import { useAppointments } from "../../services/useAppointments";

function HomePage() {
  const { data, isLoading, error } = useAppointments();

  // Vai dar erro 404 ou NETWORK_ERROR se backend não estiver rodando
  // Mas você verá a requisição sendo feita no DevTools

  console.log({ data, isLoading, error });

  return <div>Home</div>;
}
```

### 4. Estrutura dos Endpoints Esperados

O backend deve implementar estes endpoints:

```
POST   /api/auth/login          - Login
POST   /api/auth/logout         - Logout
POST   /api/auth/register       - Registro
POST   /api/auth/refresh        - Refresh token
GET    /api/auth/me             - Usuário atual

GET    /api/appointments        - Listar consultas
POST   /api/appointments        - Criar consulta
GET    /api/appointments/:id    - Buscar consulta
PUT    /api/appointments/:id    - Atualizar consulta
PATCH  /api/appointments/:id/cancel       - Cancelar
PATCH  /api/appointments/:id/reschedule   - Reagendar
POST   /api/appointments/:id/payment      - Confirmar pagamento

GET    /api/contents            - Listar conteúdos
POST   /api/contents            - Criar conteúdo
GET    /api/contents/:id        - Buscar conteúdo
PUT    /api/contents/:id        - Atualizar conteúdo
DELETE /api/contents/:id        - Deletar conteúdo

GET    /api/psychologists                      - Listar psicólogos
GET    /api/psychologists/:id                  - Buscar psicólogo
GET    /api/psychologists/:id/availabilities   - Buscar disponibilidades
PUT    /api/psychologists/:id/availabilities   - Atualizar disponibilidades
```

### 5. Formato de Resposta Esperado

#### Sucesso (exemplo):

```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "João Silva"
  }
}
```

Ou simplesmente retornar os dados diretamente:

```json
{
  "id": "123",
  "name": "João Silva"
}
```

#### Erro (exemplo):

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Email é obrigatório"
}
```

O interceptor já trata status HTTP (401, 403, 404, 500).

### 6. Testando Autenticação

1. **Faça login manualmente no DevTools Console:**

```javascript
// Abra DevTools (F12) → Console
import("./services/authService.js").then(({ authService }) => {
  authService
    .login("teste@example.com", "senha123")
    .then((result) => console.log(result));
});
```

2. **Verifique o token armazenado:**

```javascript
localStorage.getItem("token");
```

3. **Teste uma requisição autenticada:**

```javascript
import("./services/api.js").then(({ default: api }) => {
  api.get("/appointments").then((res) => console.log(res.data));
});
```

### 7. Debugando Erros Comuns

#### ❌ CORS Error

```
Access to XMLHttpRequest at 'http://localhost:3000/api/...' from origin 'http://localhost:5173' has been blocked by CORS
```

**Solução**: Configure CORS no backend OU use o proxy do Vite (já configurado).

#### ❌ Network Error

```
Network Error / ERR_CONNECTION_REFUSED
```

**Solução**: Backend não está rodando. Inicie o servidor backend.

#### ❌ 404 Not Found

```
GET http://localhost:3000/api/appointments 404 (Not Found)
```

**Solução**: Endpoint não existe no backend. Implemente o endpoint.

#### ❌ 401 Unauthorized

```
GET http://localhost:3000/api/appointments 401 (Unauthorized)
```

**Solução**:

- Faça login primeiro
- Verifique se o token está sendo enviado (DevTools → Network → Headers)

### 8. Integrando com Componentes Existentes

#### Exemplo: Página de Login

```jsx
// src/pages/login/index.jsx
import { authService } from "../../services/authService";

// No handleSubmit do formulário:
const handleSubmit = async (formData) => {
  const result = await authService.login(formData.email, formData.password);

  if (result.success) {
    navigate("/home");
  } else {
    setError(result.error);
  }
};
```

#### Exemplo: Página de Consultas

```jsx
// src/pages/appointmentsPatient/index.jsx
import { useAppointments } from "../../services/useAppointments";

function AppointmentsPatient() {
  const { data, isLoading, error } = useAppointments({
    status: statusFilter,
  });

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;

  return (
    <div>
      {data?.items?.map((appointment) => (
        <AppointmentCard key={appointment.id} {...appointment} />
      ))}
    </div>
  );
}
```

### 9. DevTools úteis

#### React Query DevTools (opcional)

Instale para visualizar cache e queries:

```bash
npm install @tanstack/react-query-devtools
```

Adicione no `main.jsx`:

```jsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Dentro do QueryClientProvider:
<QueryClientProvider client={queryClient}>
  <GlobalStyles />
  <Routes />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>;
```

## 📚 Documentação Completa

Veja `API_INTEGRATION.md` para documentação detalhada.

## 🎯 Checklist de Integração

- [ ] Backend rodando em `http://localhost:3000`
- [ ] `.env` configurado com `VITE_API_URL`
- [ ] Frontend rodando com `npm run dev`
- [ ] Endpoint `/api/auth/login` implementado no backend
- [ ] CORS configurado no backend (se não usar proxy)
- [ ] Teste de login funcional
- [ ] Token sendo armazenado no localStorage
- [ ] Requisições autenticadas funcionando
- [ ] Interceptor de refresh testado (expire token manualmente)

## 🚨 Em caso de dúvidas

1. Veja exemplos em `src/services/examples.js`
2. Consulte `API_INTEGRATION.md`
3. Verifique DevTools → Console e Network tab
4. Teste endpoints com Postman/Insomnia primeiro
