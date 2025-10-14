import styled from "styled-components";
import { BreakPoints, Colors, FontSizes } from "../../globalConfigs";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
`;

export const Container = styled.div`
  width: 75%;
  padding: 1rem 0;
  display: flex;
  gap: 1rem;

  @media (max-width: ${BreakPoints.TABLET}) {
    width: 92%;
    flex-direction: column;
  }
  @media (max-width: ${BreakPoints.MOBILE}) {
    width: 96%;
  }
`;

export const TopActions = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
  margin-bottom: 0.5rem;

  @media (max-width: ${BreakPoints.TABLET}) {
    justify-content: center;
  }
`;

export const BottomActions = styled.div`
  width: 75%;
  display: flex;
  justify-content: flex-start;
  margin-top: 0.75rem;

  @media (max-width: ${BreakPoints.TABLET}) {
    width: 92%;
    justify-content: center;
  }
  @media (max-width: ${BreakPoints.MOBILE}) {
    width: 96%;
  }
`;

export const Card = styled.div`
  background: ${Colors.WHITE};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  width: 100%;
`;

export const NextAppointment = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  @media (max-width: ${BreakPoints.TABLET}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const ActionsRow = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
`;

export const UpcomingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AppointmentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.4rem 0;

  img {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    object-fit: cover;
  }

  @media (max-width: ${BreakPoints.MOBILE}) {
    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }
  }
`;

export default {};
