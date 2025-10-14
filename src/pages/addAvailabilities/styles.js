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
  flex-direction: column;
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

export const TopRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${BreakPoints.TABLET}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;

  button {
    font-size: ${FontSizes.SMALL};
  }
`;

export const MainCard = styled.div`
  width: 100%;
  background: ${Colors.WHITE};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
`;

export default {};
