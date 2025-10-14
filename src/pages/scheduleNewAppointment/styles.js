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
  /* ensure width doesn't force horizontal scroll */
  min-width: 100%;
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

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 100%;
  @media (max-width: ${BreakPoints.TABLET}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
  color: ${Colors.GREY};
`;

export const SearchBar = styled.input`
  flex: 1;
  /* espaço à esquerda para o ícone */
  padding: 0.6rem 0.8rem 0.6rem 2.5rem;
  border-radius: 6px;
  border: 2px solid ${Colors.ORANGE};
  background: transparent;
`;

export const SearchSelect = styled.select`
  flex: 1;
  padding: 0.6rem 0.8rem 0.6rem 2.5rem;
  border-radius: 6px;
  border: 2px solid ${Colors.ORANGE};
  background: transparent;
  color: ${Colors.DARK_GREY};
  appearance: none;
`;

export const CurrencyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-left: 3rem;
  width: 40%;
  @media (max-width: ${BreakPoints.TABLET}) {
    margin-left: 0;
    width: 100%;
    margin-top: 0.4rem;
  }
`;

export const CurrencyLabel = styled.label`
  font-size: ${FontSizes.SMALL};
  color: ${Colors.ORANGE};
`;

export const CurrencyInput = styled.input`
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  border: 2px solid ${Colors.ORANGE};
  background: transparent;
  color: ${Colors.DARK_GREY};
`;

export const FilterButton = styled.button`
  background: none;
  border: none;
  color: ${Colors.GREY};
  cursor: pointer;
`;

export const PsychologistsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const PsychologistCard = styled.div`
  display: flex;
  min-height: 90px;
  width: 100%;
  background-color: ${Colors.WHITE};
  align-items: flex-start;
  border-radius: 8px;
  flex-direction: column; /* stack on tablet */
  padding: 0.6rem;
  gap: 0.6rem;
  @media (max-width: ${BreakPoints.TABLET}) {
    align-items: center;
    padding: 0.8rem;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  padding: 1%;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  border-bottom: 1px solid ${Colors.GREY};
`;

export const ProfessionalPictureContainer = styled.div``;

export const ProfessionalPicture = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 38px;
  object-fit: cover;
  @media (max-width: ${BreakPoints.TABLET}) {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
  @media (max-width: ${BreakPoints.MOBILE}) {
    width: 48px;
    height: 48px;
    border-radius: 24px;
  }
`;

// add spacing when in row layout
export const ProfilePictureWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.8rem;
  @media (max-width: ${BreakPoints.TABLET}) {
    margin-right: 0;
    margin-bottom: 0.4rem;
  }
`;

export const PrimaryInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 2%;
  @media (max-width: ${BreakPoints.TABLET}) {
    padding-left: 1%;
  }
  /* allow this flex child to shrink to prevent overflow on small screens */
  min-width: 0;
`;

export const ProfessionalName = styled.div`
  font-size: ${FontSizes.MEDIUM};
  font-weight: bold;
  color: ${Colors.DARK_GREY};
`;

export const ProfessionalCrp = styled.div`
  font-size: ${FontSizes.SMALL};
  font-weight: bold;
  color: ${Colors.GREY};
`;

export const ProfessionalRating = styled.div`
  font-size: ${FontSizes.SMALL};
  color: ${Colors.GREY};
  text-align: center;
  flex-direction: row;
  display: flex;
  align-items: center;
`;

export const AnotherInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 1%;
  height: 100%;
  @media (max-width: ${BreakPoints.TABLET}) {
    flex-direction: column;
    gap: 0.6rem;
  }
`;

export const SecondaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.3rem;
  width: 100%;
  height: 100%;
  min-width: 0;
`;

export const Specialties = styled.div`
  font-size: ${FontSizes.LARGE};
  font-weight: semi-bold;
  color: ${Colors.GREEN};
`;

export const Approaches = styled.div`
  font-size: ${FontSizes.LARGE};
  color: ${Colors.BROWN};
`;

export const TertiaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
  margin-top: auto;
  gap: 0.5rem;
  min-width: 0;
`;

export const InfoWithIcon = styled.div`
  font-size: ${FontSizes.SMALL};
  color: ${Colors.GREY};
  align-items: center;
  display: flex;
  gap: 1rem;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: ${BreakPoints.TABLET}) {
    /* allow wrapping on smaller screens to avoid horizontal scroll */
    white-space: normal;
    overflow: visible;
  }
`;

export const ExtendButton = styled.button`
  background: none;
  border: none;
  color: ${Colors.GREY};
  font-size: ${FontSizes.LARGE};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 10%;
  cursor: pointer;
`;

export const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  @media (max-width: ${BreakPoints.TABLET}) {
    align-items: stretch;
  }
`;

// make the scheduling area take a fixed column on desktop so it aligns vertically
export const ScheduleColumn = styled.div`
  min-width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${BreakPoints.TABLET}) {
    min-width: 0;
    width: 100%;
  }
`;

export const ScheduleButton = styled.button`
  background-color: ${Colors.WHITE};
  color: ${Colors.ORANGE};
  border: 1px solid ${Colors.ORANGE};
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-size: ${FontSizes.SMALL};

  &:hover {
    background-color: ${Colors.LIGHT_ORANGE};
    color: ${Colors.WHITE};
  }
  height: 35px;
  width: 80%;
  @media (max-width: ${BreakPoints.TABLET}) {
    width: 100%;
  }
`;

export const Description = styled.div`
  font-size: ${FontSizes.SMALL};
  color: ${Colors.GREY};
`;

export const DialogProfile = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const DialogAvatar = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  object-fit: cover;
`;

export const DialogInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const DialogLabel = styled.div`
  font-size: ${FontSizes.SMALL};
  color: ${Colors.DARK_GREY};
  font-weight: 600;
`;

export const DialogValue = styled.div`
  font-size: ${FontSizes.SMALL};
  color: ${Colors.DARK_GREY};
`;
