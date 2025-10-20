import styled from "styled-components";
import { BreakPoints, Colors, FontSizes } from "../../globalConfigs";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
`;

export const Container = styled.div`
  width: 90%;
  margin-top: 1rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  padding: 1rem 0;
  display: grid;
  background-color: ${Colors.WHITE};
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: start;
  padding: 2%;

  @media (max-width: ${BreakPoints.TABLET}) {
    width: 92%;
    padding: 0.8rem 0;
    grid-template-columns: 1fr;
  }
  @media (max-width: ${BreakPoints.MOBILE}) {
    width: 96%;
    padding: 0.6rem 0;
    grid-template-columns: 1fr;
  }
`;

export const BottomRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 0;

  @media (max-width: ${BreakPoints.TABLET}) {
    width: 100%;
    justify-content: center;
    padding-top: 0;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;

  button {
    font-size: ${FontSizes.SMALL};
  }

  @media (max-width: ${BreakPoints.MOBILE}) {
    gap: 0.4rem;
    button {
      font-size: ${FontSizes.SMALL};
      padding: 8px 10px;
    }
  }
`;

export const MainCard = styled.div`
  width: 100%;
  border: 1px solid ${Colors.LIGHT_GREY};
  background: ${Colors.WHITE};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 50vh;
  @media (max-width: ${BreakPoints.TABLET}) {
    overflow-x: auto;
    padding: 0.8rem;
  }
  @media (max-width: ${BreakPoints.MOBILE}) {
    overflow-x: auto;
    padding: 0.6rem;
  }
`;

export default {};
