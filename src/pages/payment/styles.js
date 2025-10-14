import styled from "styled-components";
import { BreakPoints, Colors, FontSizes } from "../../globalConfigs";

export const PageContainer = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10%;
  min-height: 100%;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 900px;
  background: ${Colors.WHITE};
  border-radius: 10px;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PaymentCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: ${Colors.DARK_GREY};
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.div`
  font-size: ${FontSizes.SMALL};
  color: ${Colors.DARK_GREY};
  font-weight: 600;
`;

export const Value = styled.div`
  font-size: ${FontSizes.SMALL};
  color: ${Colors.DARK_GREY};
`;

export const QrContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 2px dashed ${Colors.GREY};
  border-radius: 8px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6),
    rgba(250, 250, 250, 0.6)
  );
`;

export const PixText = styled.input`
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  border: 1px solid ${Colors.GREY};
  background: transparent;
  color: ${Colors.DARK_GREY};
`;

export const CopyButton = styled.button`
  background: ${Colors.WHITE};
  color: ${Colors.ORANGE};
  width: 50%;
  border: 1px solid ${Colors.ORANGE};
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
`;

export const SmallHint = styled.div`
  font-size: 0.8rem;
  color: ${Colors.GREY};
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ConfirmButton = styled.button`
  background: ${Colors.ORANGE};
  width: 50%;
  color: ${Colors.WHITE};
  border: none;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  cursor: pointer;
`;

export const Avatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  object-fit: cover;
`;

export default {};
