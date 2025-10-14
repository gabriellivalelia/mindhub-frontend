import React, { useMemo } from 'react';
import { PageContainer, Container, Card, NextAppointment, UpcomingList, BottomActions, AppointmentItem, ActionsRow, TopActions } from './styles';
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
          <h4 style={{ borderBottom: `2px solid ${Colors.PURPLE}` }}>Próxima Consulta</h4>
          {next ? (
            <NextAppointment>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '2%' }}>
                <img src={next.professionalPicture} alt={next.professional} style={{ width: 72, height: 72, borderRadius: 40, objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 700 }}>{next.professional}</div>
                  <div style={{ color: Colors.GREY }}>{new Date(next.datetime).toLocaleString()}</div>
                </div>
              </div>
              <ActionsRow>
                <Button  sx={{ borderColor: 'none', color: Colors.GREY }} onClick={() => navigate('/consultations')}><MoreHoriz /></Button>
              </ActionsRow>
            </NextAppointment>
          ) : (
            <div>Nenhuma consulta agendada.</div>
          )}
        </Card>

        <Card>
          <h4 style={{ borderBottom: `2px solid ${Colors.PURPLE}` }}>Última Consulta</h4>
          {lastPast ? (
            <AppointmentItem>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '2%' }}>
                <img src={lastPast.professionalPicture} alt={lastPast.professional} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{lastPast.professional}</div>
                  <div style={{ color: Colors.GREY }}>{new Date(lastPast.datetime).toLocaleString()}</div>
                </div>
                <div style={{ minWidth: 100, textAlign: 'right' }}>{lastPast.status}</div>
              </div>
            </AppointmentItem>
          ) : (
            <div style={{ padding: '2%' }}>Nenhuma consulta anterior registrada.</div>
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