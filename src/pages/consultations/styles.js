import styled from "styled-components";
import { BreakPoints, Colors, FontSizes } from "../../globalConfigs";
import { IMaskInput } from "react-imask";

export const PageContainer = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100%;
`;

export const Container = styled.div`
  width: 75%;
  height: 100%;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  @media (max-width: ${BreakPoints.TABLET}) {
    width: 92%;
    padding: 0.8rem 0;
  }
  @media (max-width: ${BreakPoints.MOBILE}) {
    width: 96%;
    padding: 0.6rem 0;
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  width: 100%;
  @media (max-width: ${BreakPoints.TABLET}) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.6rem;
  }
`;

export const SearchBar = styled.input`
  flex: 1;
  /* espaço à esquerda para o ícone */
  padding: 0.6rem 0.8rem 0.6rem 2.5rem;
  border-radius: 6px;
  border: 2px solid ${Colors.ORANGE};
  background: transparent;
`;

export const FilterButton = styled.button`
  background: none;
  border: none;
  color: ${Colors.GREY};
  cursor: pointer;
`;

export const ConsultationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const ConsultationCard = styled.div`
  display: flex;
  min-height: 90px;
  width: 100%;
  background-color: ${Colors.WHITE};
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  padding: 0.6rem 0.8rem;
  gap: 0.5rem;
  @media (max-width: ${BreakPoints.TABLET}) {
    flex-direction: column;
    align-items: stretch;
    padding: 0.8rem;
  }
`;
export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
  color: ${Colors.GREY};
`;

export const ProfessionalPictureContainer = styled.div``;

export const ProfessionalPicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  object-fit: cover;
  @media (max-width: ${BreakPoints.TABLET}) {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
`;

export const ConsultationInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  min-width: 0;
`;

export const ProfessionalName = styled.div`
  font-size: ${FontSizes.MEDIUM};
  font-weight: bold;
  color: ${Colors.DARK_GREY};
`;

export const ConsultationDateTime = styled.div`
  font-size: ${FontSizes.SMALL};
  color: ${Colors.GREY};
  display: flex;
  flex-direction: row;
  text-align: center;
  gap: 0.3rem;
  padding: 0;
`;

export const ConsultationStatus = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  font-size: ${FontSizes.SMALL};
  @media (max-width: ${BreakPoints.TABLET}) {
    align-self: flex-start;
    margin-top: 0.5rem;
  }
`;

export const MoreInfoButton = styled.button`
  width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background: none;
  border: none;
  color: ${Colors.GREY};
  cursor: pointer;
  @media (max-width: ${BreakPoints.TABLET}) {
    width: auto;
    justify-content: flex-start;
    margin-top: 0.5rem;
  }
`;

export const ScheduleNewAppointmentButton = styled.button`
  background: ${Colors.BROWN};
  border: 1px solid ${Colors.PURPLE};
  border-radius: 5px;
  color: ${Colors.WHITE};
  font-size: ${FontSizes.LARGE};
  height: 60px;
  min-width: 120px;
  width: 30%;

  @media (max-width: ${BreakPoints.MOBILE}) {
    font-size: ${FontSizes.MEDIUM};
    height: 60px;
    width: 55%;
  }

  &:hover {
    background-color: ${Colors.PURPLE};
    cursor: pointer;
  }
`;
