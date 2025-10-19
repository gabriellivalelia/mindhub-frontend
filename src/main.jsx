import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyles from "./globalConfigs/globalStyles/mainStyles";
import Routes from './routes';

// Configurar cliente do TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Tentar 2 vezes em caso de erro
      refetchOnWindowFocus: false, // Não refetch ao focar janela (pode mudar conforme necessidade)
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <Routes />
    </QueryClientProvider>
  </React.StrictMode>
);