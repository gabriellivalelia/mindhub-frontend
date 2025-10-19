import React from 'react';
import { useEffect, useState } from 'react';
import { SubHeader } from '../../components';
import AddAvailabilitiesComponent from '../../components/addAvailabilitiesComponent';
import { PageContainer, Container, TopRow, Actions, MainCard, TitleStrong, } from './styles';
import Button from '@mui/material/Button';
import Colors from '../../globalConfigs/globalStyles/colors';

const AddAvailabilitiesPage = () => {
  const [selectedSlots, setSelectedSlots] = React.useState([]);
  const [daysVisible, setDaysVisible] = useState(7);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 480) setDaysVisible(3);
      else if (w <= 768) setDaysVisible(5);
      else setDaysVisible(7);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handleSelectionChange = (slots) => {
    setSelectedSlots(slots);
  };

  const handleSave = () => {
    console.log('Saving availabilities:', selectedSlots);
  };

  return (
    <PageContainer>
      <SubHeader text="Gerencie seus horários" />
      <Container>
        <TopRow>
          <Actions>
            <Button variant="outlined" sx={{ borderColor: Colors.ORANGE, color: Colors.ORANGE }} onClick={() => setSelectedSlots([])}>Limpar</Button>
            <Button variant="contained" sx={{ backgroundColor: Colors.ORANGE, color: Colors.WHITE }} onClick={handleSave}>Salvar</Button>
          </Actions>
        </TopRow>
        <MainCard>
          <AddAvailabilitiesComponent daysVisible={daysVisible} onSelectionChange={handleSelectionChange} />
        </MainCard>
      </Container>
    </PageContainer>
  );
};

export default AddAvailabilitiesPage;
