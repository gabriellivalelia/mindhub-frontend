import React, { useMemo, useState } from 'react';
import { PageContainer, Container, Card, NextAppointment, UpcomingList, BottomActions, AppointmentItem, ActionsRow, TopActions, SectionTitle, Row, Avatar, StrongText, MutedText, Padded, RightText, ScheduleButton, Info } from './styles';
import { SubHeader } from '../../components';
import { homeUpcoming } from './homeData';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CancelIcon from '@mui/icons-material/Cancel';
import Colors from '../../globalConfigs/globalStyles/colors';
import { useNavigate } from 'react-router-dom';
import { getUserType } from '../../utils/auth';
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Brightness1 from "@mui/icons-material/Brightness1";
import { FontSizes } from '../../globalConfigs';
import { Divider } from 'antd';

function Home() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState(homeUpcoming || []);

  const upcoming = useMemo(() => {
    const now = new Date();
    const future = (appointments || []).filter(c => new Date(c.datetime) >= now);
    future.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    return future;
  }, [appointments]);

  const next = upcoming[0] || null;
  const lastPast = useMemo(() => {
    const now = new Date();
    const past = (appointments || []).filter(c => new Date(c.datetime) < now);
    past.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
    return past[0] || null;
  }, [appointments]);

  const userType = getUserType();

  const todaysAppointments = useMemo(() => {
    if (userType !== 'psychologist') return [];
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return (appointments || []).filter(c => {
      const dt = new Date(c.datetime);
      return dt >= start && dt < end;
    }).sort((a,b) => new Date(a.datetime) - new Date(b.datetime));
  }, [userType, appointments]);

  const markAsCompleted = (id) => {
    console.log('Marking as completed:', id);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleReschedule = (appointment) => {
    handleMenuClose();
    if (!appointment) return;
    navigate('/schedule-new-appointment', { state: { preselectId: appointment.professionalId } });
  };

  const handleCancel = (appointmentId) => {
    handleMenuClose();
    setAppointments(prev => prev.map(a => a.id === appointmentId ? { ...a, status: 'Cancelada' } : a));
  };

  return (
    <PageContainer>
      <SubHeader text="Home" />
      <Container>
        {userType === 'psychologist' && (
          <Card>
            <SectionTitle>Consultas de Hoje</SectionTitle>
            {todaysAppointments.length ? (
              <UpcomingList>
                {todaysAppointments.map((c) => {
                  const displayName = userType === 'psychologist' ? (c.patient || c.professional) : c.professional;
                  const displayPicture = userType === 'psychologist' ? (c.patientPicture || c.professionalPicture) : c.professionalPicture;
                  return (
                    <AppointmentItem key={c.id}>
                      <Row p="6px">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: '45%' }}>
                          <Avatar src={displayPicture} alt={displayName} size={48} />
                          <Info>
                            <StrongText>{displayName}</StrongText>
                            <MutedText><ScheduleIcon sx={{ color: Colors.GREY, fontSize: FontSizes.MEDIUM }} />{new Date(c.datetime).toLocaleTimeString()}</MutedText>
                          </Info>
                        </div>
                        <RightText><Brightness1 sx={{ fontSize: FontSizes.NORMAL, color: Colors.GREEN}} />{c.status}</RightText>
                        {new Date(c.datetime) < new Date() ? (
                          <Button
                            variant="contained"
                            disableElevation
                            sx={{ backgroundColor: Colors.ORANGE, color: Colors.WHITE, textTransform: 'none', boxShadow: 'none', minWidth: 185 }}
                            onClick={() => markAsCompleted(c.id)}
                          >
                            Marcar como concluída
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            disableElevation
                            sx={{ backgroundColor: Colors.GREY, color: Colors.WHITE, textTransform: 'none', boxShadow: 'none', minWidth: 185 }}
                            onClick={() => markAsCompleted(c.id)}
                          >
                            Cancelar consulta
                          </Button>
                        )}
                      </Row>
                    </AppointmentItem>
                  );
                })}
              </UpcomingList>
            ) : (
              <Padded p="8px">Nenhuma consulta para hoje.</Padded>
            )}
          </Card>
        )}

        {userType === 'patient' && (
          <>
            <Card>
              <SectionTitle>Próxima Consulta</SectionTitle>
              {next ? (
                <NextAppointment>
                  <Row p="2%">
                    <Avatar src={next.professionalPicture} alt={next.professional} />
                    <Info>
                      <StrongText>{next.professional}</StrongText>
                      <MutedText><ScheduleIcon sx={{ color: Colors.GREY, fontSize: FontSizes.MEDIUM}} />{new Date(next.datetime).toLocaleString()}</MutedText>
                    </Info>
                  </Row>
                  <ActionsRow>
                    <IconButton size="small" onClick={handleMenuOpen} sx={{ color: Colors.GREY }} aria-controls={menuOpen ? 'next-appointment-menu' : undefined} aria-haspopup="true" aria-expanded={menuOpen ? 'true' : undefined}>
                      <MoreHoriz />
                    </IconButton>
                    <Menu
                      id="next-appointment-menu"
                      anchorEl={anchorEl}
                      open={menuOpen}
                      onClose={handleMenuClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <MenuItem onClick={() => handleReschedule(next)}>
                          <ListItemIcon>
                            <ScheduleIcon sx={{ color: Colors.LIGHT_ORANGE }} fontSize="small" />
                          </ListItemIcon>
                          Reagendar consulta
                        </MenuItem>
                        <MenuItem onClick={() => handleCancel(next.id)}>
                          <ListItemIcon>
                            <CancelIcon sx={{ color: Colors.GREY }} fontSize="small" />
                          </ListItemIcon>
                          Cancelar consulta
                        </MenuItem>
                    </Menu>
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
                  {(() => {
                    const hasReagendar = !next;
                    return (
                      <Row p="2%" style={{ justifyContent: hasReagendar ? undefined : 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Avatar src={lastPast.professionalPicture} alt={lastPast.professional} size={48} />
                          <Info>
                            <StrongText>{lastPast.professional}</StrongText>
                            <MutedText><ScheduleIcon sx={{ color: Colors.GREY, fontSize: FontSizes.MEDIUM }} />{new Date(lastPast.datetime).toLocaleString()}</MutedText>
                          </Info>
                        </div>
                        <RightText><Brightness1 sx={{ fontSize: FontSizes.NORMAL, color: Colors.PURPLE}} />{lastPast.status}</RightText>
                        {userType === 'patient' && !next && (
                          <Button
                            variant="contained"
                            disableElevation
                            sx={{ backgroundColor: Colors.LIGHT_ORANGE, color: Colors.WHITE, textTransform: 'none', boxShadow: 'none' }}
                            onClick={() => navigate('/schedule-new-appointment', { state: { preselectId: lastPast.professionalId } })}
                          >
                            Reagendar com esse psicólogo
                          </Button>
                        )}
                      </Row>
                    );
                  })()}
                </AppointmentItem>
              ) : (
                <Padded p="2%">Nenhuma consulta anterior registrada.</Padded>
              )}
            </Card>
          </>
        )}
      </Container>
        {userType === 'patient' && ( 
          <BottomActions>
            <ScheduleButton onClick={() => navigate('/schedule-new-appointment')}>Agendar consulta</ScheduleButton>
          </BottomActions>
        )}
    </PageContainer>
  );
}

export default Home;