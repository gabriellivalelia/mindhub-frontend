import React from 'react';
import { SubHeader } from '../../components';
import AddAvailabilitiesComponent from '../../components/addAvailabilitiesComponent';
import { PageContainer, Container, TopRow, Actions, MainCard } from './styles';
import Button from '@mui/material/Button';
import Colors from '../../globalConfigs/globalStyles/colors';

const AddAvailabilitiesPage = () => {
  const [selectedSlots, setSelectedSlots] = React.useState([]);

  const handleSelectionChange = (slots) => {
    setSelectedSlots(slots);
  };

  const handleSave = () => {
    // TODO: save to backend. For now, log to console
    console.log('Saving availabilities:', selectedSlots);
    // show a toast or navigate back in a real app
  };

  return (
    <PageContainer>
      <SubHeader text="Meus Horários Disponíveis" />
      <Container>
        <TopRow>
          <div style={{ fontWeight: 700 }}>Defina seus horários disponíveis</div>
          <Actions>
            <Button variant="outlined" sx={{ borderColor: Colors.ORANGE, color: Colors.ORANGE }} onClick={() => setSelectedSlots([])}>Limpar</Button>
            <Button variant="contained" sx={{ backgroundColor: Colors.ORANGE, color: Colors.WHITE }} onClick={handleSave}>Salvar</Button>
          </Actions>
        </TopRow>

        <MainCard>
          <AddAvailabilitiesComponent daysVisible={7} onSelectionChange={handleSelectionChange} />
        </MainCard>
      </Container>
    </PageContainer>
  );
};

export default AddAvailabilitiesPage;
