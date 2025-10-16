import React, { useMemo } from 'react';
import { PageContainer, Container, Card, NextAppointment, UpcomingList, BottomActions, AppointmentItem, ActionsRow, TopActions, SectionTitle, Row, Avatar, StrongText, MutedText, Padded, RightText } from './styles';
import { SubHeader } from '../../components';
import { homeUpcoming, nextAppointment } from './homeData';
import Button from '@mui/material/Button';
import Colors from '../../globalConfigs/globalStyles/colors';
import { useNavigate } from 'react-router-dom';
import { Button as PreLoginButton } from '../preLogin/styles';
import MoreHoriz from "@mui/icons-material/MoreHoriz";


function Home() {
  const navigate = useNavigate();

  const upcoming = useMemo(() => {
    const now = new Date();
    const future = (homeUpcoming || []).filter(c => new Date(c.datetime) >= now);
    future.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    return future;
  }, []);

  const next = nextAppointment || upcoming[0] || null;
  const lastPast = useMemo(() => {
    const now = new Date();
    const past = (homeUpcoming || []).filter(c => new Date(c.datetime) < now);
    past.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
    return past[0] || null;
  }, []);

  return (
    <PageContainer>
      <SubHeader text="Home" />
      <Container>
        <Card>
          <SectionTitle>Próxima Consulta</SectionTitle>
          {next ? (
            <NextAppointment>
                <Row p="2%">
                  <Avatar src={next.professionalPicture} alt={next.professional} />
                  <div>
                    <StrongText>{next.professional}</StrongText>
                    <MutedText>{new Date(next.datetime).toLocaleString()}</MutedText>
                  </div>
                </Row>
              <ActionsRow>
                <Button  sx={{ borderColor: 'none', color: Colors.GREY }} onClick={() => navigate('/appointmentsPatient')}><MoreHoriz /></Button>
              </ActionsRow>
            </NextAppointment>
          ) : (
            <div>Nenhuma consulta agendada.</div>
          )}
        </Card>

        <Card>
          <SectionTitle>Última Consulta</SectionTitle>
          {lastPast ? (
              <AppointmentItem>
                <Row p="2%">
                  <Avatar src={lastPast.professionalPicture} alt={lastPast.professional} size={48} />
                  <div style={{ flex: 1 }}>
                    <StrongText>{lastPast.professional}</StrongText>
                    <MutedText>{new Date(lastPast.datetime).toLocaleString()}</MutedText>
                  </div>
                  <RightText>{lastPast.status}</RightText>
                </Row>
              </AppointmentItem>
          ) : (
            <Padded p="2%">Nenhuma consulta anterior registrada.</Padded>
          )}
          {/* brown button moved to TopActions */}
        </Card>
      </Container>
      <BottomActions>
        <PreLoginButton onClick={() => navigate('/schedule-new-appointment')}>Agendar consulta</PreLoginButton>
      </BottomActions>
    </PageContainer>
  );
}

export default Home;