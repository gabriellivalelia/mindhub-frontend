import React from 'react';
import { PageContainer, Container, Card, Title, MessageRow, BackButton } from './styles';
import { SubHeader } from '../../components';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <SubHeader text="Página não encontrada" />
      <Container>
        <Card>
          <Title>404 — Página não encontrada</Title>
          <MessageRow>Desculpe, a página que você procura não existe ou foi movida.</MessageRow>
          <BackButton onClick={() => navigate('/')}>Voltar para a Home</BackButton>
        </Card>
      </Container>
    </PageContainer>
  );
}

export default NotFound;