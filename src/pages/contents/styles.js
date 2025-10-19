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
  background: ${Colors.LIGHT_GREY};
  border-radius: 8px;
  padding: 1rem;
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
  background: ${Colors.WHITE};

  @media (max-width: ${BreakPoints.TABLET}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const ContentTitle = styled.div`
  font-weight: 700;
`;

export const ContentExcerpt = styled.div`
  color: ${Colors.GREY};
  font-size: ${FontSizes.SMALL};
`;

export default {};
