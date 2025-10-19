import React from 'react';
import { PageContainer, Container, Card, Title, MessageRow, ActionButton } from './styles';
import { SubHeader } from '../../components';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <SubHeader text="Acesso não autorizado" />
      <Container>
        <Card>
          <Title>403 — Acesso negado</Title>
          <MessageRow>
            Você precisa estar logado para acessar esta área. Faça login para continuar.
          </MessageRow>
          <ActionButton onClick={() => navigate('/login')}>Ir para Login</ActionButton>
        </Card>
      </Container>
    </PageContainer>
  );
}

export default Unauthorized;
