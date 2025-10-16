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

export const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ContentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 0.75rem;
  border-radius: 6px;
  background: ${Colors.LIGHT_ORANGE};
`;

export const ContentTitle = styled.div`
  font-weight: 700;
`;

export const ContentExcerpt = styled.div`
  color: ${Colors.GREY};
  font-size: ${FontSizes.SMALL};
`;

export default {};
