import styled from "styled-components";
import { BreakPoints, Colors, FontSizes } from "../../globalConfigs";
import { IMaskInput } from "react-imask";

export const PageContainer = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  min-height: 100%;
`;

export const Container = styled.main`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 1rem 2rem;
`;

export const FormContainer = styled.div`
  align-items: center;
  background: ${Colors.WHITE};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-around;
  max-width: 800px;
  padding: 1.5rem;
  text-align: left;
  width: 100%;
`;

export const Form = styled.form`
  display: grid;
  gap: 1rem 1.5rem;
  grid-template-columns: 1fr 1fr;
  width: 100%;

  @media (max-width: ${BreakPoints.TABLET}) {
    gap: 1rem;
    grid-template-columns: 1fr;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  gap: 0.3rem;
`;

export const FullWidthInputContainer = styled(InputContainer)`
  grid-column: 1 / -1;
`;

export const InputAndLabelBox = styled.div`
  background: ${Colors.WHITE};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.6rem 0.8rem;
`;

export const Label = styled.label`
  color: ${Colors.GREY};
  font-size: ${FontSizes.SMALLEST};
`;

const commonInputStyles = `
  padding: 0.25rem 0;
  box-sizing: border-box;
  border: none;
  font-size: ${FontSizes.SMALLEST};
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

export const Input = styled.input`
  ${commonInputStyles}
`;

export const StyledMaskInput = styled(IMaskInput)`
  ${commonInputStyles}
`;

export const SubmitButton = styled.input`
  background: ${Colors.ORANGE};
  border: none;
  border-radius: 8px;
  color: ${Colors.WHITE};
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  grid-column: 1 / -1;
  height: 45px;
  justify-self: center;
  margin-top: 1rem;
  min-width: 200px;
  width: 40%;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${Colors.LIGHT_ORANGE};
  }
`;

export const Message = styled.p`
  color: red;
  font-size: 0.75rem;
  height: 1rem;
  margin: 0;
`;

export const AvatarRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  grid-column: 1 / -1;
`;

export const AvatarPreview = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 42px;
  object-fit: cover;
`;

export const TextButton = styled.button`
  background: none;
  border: none;
  color: ${Colors.ORANGE};
  font-size: ${FontSizes.MEDIUM};
  font-weight: bold;
  padding: 0;
  text-decoration: underline;
  width: fit-content;
`;

export default {};
