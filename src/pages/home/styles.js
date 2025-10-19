import styled from "styled-components";
import { BreakPoints, Colors, FontSizes } from "../../globalConfigs";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
`;

export const Container = styled.div`
  max-width: 1100px;
  width: 90%;
  padding: 1rem 0;
  display: flex;
  gap: 1rem;
  margin: 0 auto;

  @media (max-width: ${BreakPoints.TABLET}) {
    width: 94%;
    flex-direction: column;
    gap: 0.8rem;
  }
  @media (max-width: ${BreakPoints.MOBILE}) {
    width: 98%;
    padding: 0.5rem 0;
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
  max-width: 1100px;
  width: 90%;
  margin: 0.75rem auto 0;
  display: flex;
  justify-content: flex-start;

  @media (max-width: ${BreakPoints.TABLET}) {
    width: 94%;
    justify-content: center;
  }
  @media (max-width: ${BreakPoints.MOBILE}) {
    width: 98%;
  }
`;

export const Card = styled.div`
  background: ${Colors.WHITE};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: none;
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

export const SectionTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  border-bottom: 2px solid ${Colors.PURPLE};
  padding-bottom: 0.4rem;
`;

export const Row = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: ${(p) => p.p || "0"};
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;

export const Avatar = styled.img`
  width: ${(p) => p.size || 72}px;
  height: ${(p) => p.size || 72}px;
  border-radius: ${(p) => Math.round((p.size || 72) / 2)}px;
  object-fit: cover;

  @media (max-width: ${BreakPoints.MOBILE}) {
    width: ${(p) => (p.size ? Math.max(40, p.size - 16) : 56)}px;
    height: ${(p) => (p.size ? Math.max(40, p.size - 16) : 56)}px;
    border-radius: ${(p) =>
      Math.round((p.size ? Math.max(40, p.size - 16) : 56) / 2)}px;
  }
`;

export const StrongText = styled.div`
  font-weight: 700;
`;

export const MutedText = styled.div`
  color: ${Colors.GREY};
  font-size: ${(p) => p.size || FontSizes.SMALLEST};
  align-items: center;
  display: flex;
  gap: 4px;
`;

export const Padded = styled.div`
  padding: ${(p) => p.p || "0"};
`;

export const RightText = styled.div`
  min-width: ${(p) => p.minWidth || "100px"};
  text-align: ${(p) => p.align || "right"};
  font-size: ${(p) => p.size || FontSizes.SMALL};
  align-items: center;
  display: flex;
  gap: 4px;
`;

export const Info = styled.div`
  flex: 1;
`;

export const ScheduleButton = styled.button`
  background: ${Colors.BROWN};
  border: 1px solid ${Colors.PURPLE};
  border-radius: 5px;
  color: ${Colors.WHITE};
  font-size: ${FontSizes.LARGE};
  height: 60px;
  min-width: 160px;
  width: 40%;
  padding: 0 1rem;

  @media (max-width: ${BreakPoints.MOBILE}) {
    font-size: ${FontSizes.MEDIUM};
    height: 56px;
    width: 55%;
  }

  &:hover {
    background-color: ${Colors.PURPLE};
    cursor: pointer;
  }
`;

export default {};
