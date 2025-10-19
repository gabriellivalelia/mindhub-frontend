import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import {
  PageContainer,
  Container,
  PaymentCard,
  Title,
  InfoRow,
  Label,
  Value,
  QrContainer,
  PixText,
  CopyButton,
  SmallHint,
  RightColumn,
  ConfirmButton,
  Avatar,
  FlexRow,
  RightAligned,
  QrImage,
  QrPlaceholder,
  ButtonsRow,
  PriceStrong,
  Section,
  BoldText,
} from './styles';

import Colors from '../../globalConfigs/globalStyles/colors';
import Rating from '@mui/material/Rating';
import { SubHeader } from '../../components';

function formatBRL(value) {
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  } catch {
    return `R$ ${value}`;
  }
}

const buildPixString = ({ pixKey = '00000000-0000-0000-0000-000000000000', amount = 0, description = 'Pagamento' }) => {
  // Simplified placeholder PIX payload (not following EMV specs). For demo only.
  return `PIX|key:${pixKey}|amount:${amount.toFixed(2)}|desc:${description}`;
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const psychologist = state?.psychologist;
  const slot = state?.slot;
  const price = state?.price || 0;

  const [qrSrc, setQrSrc] = React.useState('');

  React.useEffect(() => {
    const pix = buildPixString({ pixKey: '123e4567-e89b-12d3-a456-426614174000', amount: Number(price), description: `Consulta ${psychologist?.name || ''}` });
    QRCode.toDataURL(pix)
      .then(url => setQrSrc(url))
      .catch(() => setQrSrc(''));
  }, [price, psychologist]);

  const pixString = React.useMemo(() => buildPixString({ pixKey: '123e4567-e89b-12d3-a456-426614174000', amount: Number(price), description: `Consulta ${psychologist?.name || ''}` }), [price, psychologist]);

  // copyPix removed — buttons now navigate to home

  if (!psychologist || !slot) {
    return (
      <PageContainer>
        <Container>
          <PaymentCard>
            <Title>Dados de pagamento indisponíveis</Title>
            <p>Volte e selecione um horário para prosseguir ao pagamento.</p>
            <ConfirmButton onClick={() => navigate(-1)}>Voltar</ConfirmButton>
          </PaymentCard>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SubHeader text="Realizar Pagamento" />
      <Container>
        <PaymentCard>
          <Title>Resumo da Consulta</Title>
          <InfoRow>
            <FlexRow>
              <Avatar src={psychologist.picture} alt={psychologist.name} />
              <div>
                <Label>{psychologist.name}</Label>
                <Value>{psychologist.crp}</Value>
              </div>
            </FlexRow>
            <RightAligned>
              <FlexRow gap="8px" justify="flex-end">
                <Rating value={psychologist.rating} precision={0.1} readOnly size="small" sx={{ color: Colors.ORANGE }} />
                <Value>{Number(psychologist.rating).toFixed(1)}</Value>
              </FlexRow>
              <PriceStrong>{formatBRL(price)}</PriceStrong>
            </RightAligned>
          </InfoRow>

          <Section>
            <Label>Horário</Label>
            <Value>{(() => {
              const candidate = slot.datetime || (slot.day && slot.time ? `${slot.day} ${slot.time}` : null);
              if (!candidate) return '';
              try {
                const d = new Date(candidate);
                if (isNaN(d.getTime())) return `${slot.day || ''} ${slot.time || ''}`.trim();
                return d.toLocaleString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
              } catch {
                return `${slot.day || ''} ${slot.time || ''}`.trim();
              }
            })()}</Value>
          </Section>

          <Section mt="12px">
            <Label>Especialidades</Label>
            <Value>{psychologist.specialties.join(', ')}</Value>
          </Section>

          <Section mt="12px">
            <Label>Abordagens</Label>
            <Value>{psychologist.approaches.join(', ')}</Value>
          </Section>
        </PaymentCard>

        <RightColumn>
          <QrContainer>
            <BoldText>Pagar via PIX</BoldText>
            {qrSrc ? <QrImage src={qrSrc} alt="QR PIX" /> : <QrPlaceholder />}
            <SmallHint>Leia com seu app bancário ou copie o código abaixo.</SmallHint>
            <PixText readOnly value={pixString} />
            <ButtonsRow>
              <CopyButton onClick={() => navigate('/')}>Cancelar</CopyButton>
              <ConfirmButton onClick={() => navigate('/')}>Concluído</ConfirmButton>
            </ButtonsRow>
          </QrContainer>
        </RightColumn>
      </Container>
    </PageContainer>
  );
};

export default Payment;
