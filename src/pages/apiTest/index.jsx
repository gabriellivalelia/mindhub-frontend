// EXEMPLO COMPLETO: Componente de teste de integração com API
// Copie este código para qualquer página para testar a integração

import { useState } from 'react';
import { useAppointments } from '../../services/useAppointments';
import { authService } from '../../services/authService';
import { getUserType, getToken } from '../../utils/auth';

export default function ApiTestPage() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginResult, setLoginResult] = useState(null);
  const [testResult, setTestResult] = useState('');

  // Hook do TanStack Query para buscar consultas
  const { data: appointments, isLoading, error, refetch } = useAppointments();

  // === TESTE 1: Login ===
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await authService.login(loginData.email, loginData.password);
    setLoginResult(result);
    
    if (result.success) {
      setTestResult('✅ Login bem-sucedido! Token salvo.');
    } else {
      setTestResult('❌ Erro no login: ' + result.error);
    }
  };

  // === TESTE 2: Verificar Token ===
  const handleCheckToken = () => {
    const token = getToken();
    const userType = getUserType();
    
    if (token) {
      setTestResult(`✅ Token encontrado: ${token.substring(0, 20)}...\nTipo: ${userType}`);
    } else {
      setTestResult('❌ Nenhum token encontrado. Faça login primeiro.');
    }
  };

  // === TESTE 3: Buscar Consultas ===
  const handleFetchAppointments = () => {
    refetch();
    setTestResult('🔄 Buscando consultas...');
  };

  // === TESTE 4: Logout ===
  const handleLogout = async () => {
    await authService.logout();
    setLoginResult(null);
    setTestResult('✅ Logout realizado. Token removido.');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>🧪 Teste de Integração com API</h1>
      
      {/* SEÇÃO 1: LOGIN */}
      <section style={{ marginBottom: '30px', padding: '20px', border: '2px solid #333' }}>
        <h2>1️⃣ Teste de Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            style={{ padding: '10px', fontSize: '14px' }}
          />
          <input
            type="password"
            placeholder="Senha"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            style={{ padding: '10px', fontSize: '14px' }}
          />
          <button type="submit" style={{ padding: '10px', fontSize: '14px', cursor: 'pointer' }}>
            Fazer Login
          </button>
        </form>
        
        {loginResult && (
          <div style={{ marginTop: '15px', padding: '10px', background: loginResult.success ? '#d4edda' : '#f8d7da', borderRadius: '5px' }}>
            <strong>{loginResult.success ? '✅ Sucesso' : '❌ Erro'}:</strong>
            <pre>{JSON.stringify(loginResult, null, 2)}</pre>
          </div>
        )}
      </section>

      {/* SEÇÃO 2: TESTES DE TOKEN */}
      <section style={{ marginBottom: '30px', padding: '20px', border: '2px solid #333' }}>
        <h2>2️⃣ Verificar Token</h2>
        <button onClick={handleCheckToken} style={{ padding: '10px', fontSize: '14px', cursor: 'pointer', marginRight: '10px' }}>
          Ver Token Armazenado
        </button>
        <button onClick={handleLogout} style={{ padding: '10px', fontSize: '14px', cursor: 'pointer', background: '#dc3545', color: 'white', border: 'none' }}>
          Fazer Logout
        </button>
      </section>

      {/* SEÇÃO 3: TESTE DE BUSCA (REACT QUERY) */}
      <section style={{ marginBottom: '30px', padding: '20px', border: '2px solid #333' }}>
        <h2>3️⃣ Buscar Consultas (React Query)</h2>
        <button onClick={handleFetchAppointments} style={{ padding: '10px', fontSize: '14px', cursor: 'pointer' }}>
          Buscar Consultas
        </button>
        
        <div style={{ marginTop: '15px' }}>
          {isLoading && <p>⏳ Carregando consultas...</p>}
          
          {error && (
            <div style={{ padding: '10px', background: '#f8d7da', borderRadius: '5px' }}>
              <strong>❌ Erro:</strong>
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
          )}
          
          {appointments && (
            <div style={{ padding: '10px', background: '#d4edda', borderRadius: '5px' }}>
              <strong>✅ Dados recebidos:</strong>
              <pre style={{ maxHeight: '300px', overflow: 'auto' }}>
                {JSON.stringify(appointments, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* SEÇÃO 4: RESULTADO DOS TESTES */}
      <section style={{ padding: '20px', border: '2px solid #333', background: '#f8f9fa' }}>
        <h2>📋 Resultado dos Testes</h2>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#fff', padding: '15px', borderRadius: '5px' }}>
          {testResult || 'Nenhum teste executado ainda.'}
        </pre>
      </section>

      {/* SEÇÃO 5: INSTRUÇÕES */}
      <section style={{ marginTop: '30px', padding: '20px', border: '2px dashed #666' }}>
        <h2>📖 Como usar</h2>
        <ol style={{ lineHeight: '1.8' }}>
          <li><strong>Certifique-se que o backend está rodando</strong> em <code>http://localhost:3000</code></li>
          <li><strong>Configure o .env:</strong> <code>VITE_API_URL=http://localhost:3000/api</code></li>
          <li><strong>Digite email e senha</strong> e clique em "Fazer Login"</li>
          <li><strong>Abra DevTools (F12) → Network</strong> para ver requisições</li>
          <li><strong>Clique em "Buscar Consultas"</strong> para testar chamada autenticada</li>
          <li><strong>Veja os resultados</strong> nas caixas verdes/vermelhas</li>
        </ol>
        
        <h3>🔍 Endpoints testados:</h3>
        <ul>
          <li><code>POST /api/auth/login</code></li>
          <li><code>GET /api/appointments</code></li>
        </ul>
        
        <h3>⚠️ Se der erro:</h3>
        <ul>
          <li><strong>NETWORK_ERROR:</strong> Backend não está rodando</li>
          <li><strong>CORS Error:</strong> Configure CORS no backend ou use proxy do Vite</li>
          <li><strong>404:</strong> Endpoint não existe no backend</li>
          <li><strong>401:</strong> Token inválido ou expirado (faça login novamente)</li>
        </ul>
      </section>
    </div>
  );
}
