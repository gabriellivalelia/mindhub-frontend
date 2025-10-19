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
  justify-content: center;
`;

export const Card = styled.div`
  background: ${Colors.WHITE};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 640px;
  text-align: center;
`;

export const Title = styled.h2`
  margin: 0 0 0.5rem 0;
  color: ${Colors.DARK_GREY};
`;

export const MessageRow = styled.div`
  margin-bottom: 1.25rem;
  color: ${Colors.GREY};
`;

export const ActionButton = styled.button`
  background: ${Colors.ORANGE};
  color: ${Colors.WHITE};
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
`;

export default {};
