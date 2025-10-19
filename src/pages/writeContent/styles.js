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

export const EditorRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  /* On wider screens keep side-by-side, on tablet and below stack */
  @media (max-width: ${BreakPoints.TABLET}) {
    flex-direction: column;
  }
`;

export const EditorArea = styled.div`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const TitleInput = styled.input`
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  border: 1px solid ${Colors.GREY};
  font-size: ${FontSizes.MEDIUM};
`;

export const TextArea = styled.textarea`
  min-height: 280px;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  border: 1px solid ${Colors.GREY};
  resize: vertical;
  font-size: ${FontSizes.SMALL};
  font-family: inherit;
`;

export const PreviewArea = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  background: ${Colors.LIGHT_ORANGE};
  border-radius: 8px;
  padding: 0.75rem;
  overflow: auto;

  @media (max-width: ${BreakPoints.TABLET}) {
    max-width: 100%;
    width: 100%;
  }
`;

export const ButtonsRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

export default {};
