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
  background: ${Colors.LIGHT_ORANGE};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: space-around;
  max-width: 800px;
  padding: 2.5rem;
  text-align: center;
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
  transition: all 0.2s ease-in-out;
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
  background: ${Colors.GREEN};
  border: none;
  border-radius: 8px;
  color: ${Colors.WHITE};
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  grid-column: 1 / -1;
  height: 45px;
  justify-self: center;
  margin-top: 1.5rem;
  min-width: 200px;
  width: 50%;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${Colors.BROWN};
  }
`;

export const Message = styled.p`
  color: ${Colors.RED};
  font-size: 0.75rem;
  height: 1rem;
  margin: 0;
`;

export const FullMessage = styled(Message)`
  grid-column: 1 / -1;
  text-align: center;
  height: auto;
`;

export const LoaderBox = styled.div`
  align-items: center;
  background: ${Colors.GREEN};
  border-radius: 8px;
  color: white;
  display: flex;
  font-size: 1.5rem;
  grid-column: 1 / -1;
  height: 45px;
  justify-content: center;
  justify-self: center;
  min-width: 200px;
  margin-top: 1.5rem;
  width: 50%;
`;

export const DescriptionTextArea = styled.textarea`
  min-height: 100px;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  resize: vertical;
  font-size: ${FontSizes.SMALLEST};
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  background-color: transparent;
  border: 2px solid ${Colors.BROWN};
  border-radius: 8px;
  min-width: 90%;
  overflow: hidden;
  overflow-x: hidden;
`;

export const ToggleButton = styled.button`
  align-items: center;
  background: ${(props) => (props.active ? Colors.BROWN : "transparent")};
  border: none;
  color: ${Colors.WHITE};
  display: flex;
  flex-direction: row;
  font-size: ${FontSizes.MEDIUM};
  gap: 0.5rem;
  height: 45px;
  justify-content: center;
  text-align: center;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;

export const AvatarRow = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  grid-column: 1 / -1;
  flex-direction: column;

  @media (min-width: ${BreakPoints.TABLET}) {
    flex-direction: row;
    justify-content: flex-start;
  }
`;

export const AvatarPreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${Colors.WHITE};
`;

export const AvatarUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;

  @media (min-width: ${BreakPoints.TABLET}) {
    align-items: flex-start;
  }
`;

export const AvatarLabel = styled.label`
  color: ${Colors.WHITE};
  font-size: ${FontSizes.SMALL};
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s;

  &:hover {
    color: ${Colors.BROWN};
  }
`;

export const AvatarInput = styled.input`
  display: none;
`;

export const TextButton = styled.button`
  background: none;
  border: none;
  color: ${Colors.WHITE};
  font-size: ${FontSizes.SMALL};
  font-weight: 600;
  padding: 0;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${Colors.BROWN};
  }
`;

export const PasswordInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;

  input {
    flex: 1;
  }
`;

export const PasswordToggleIcon = styled.button`
  background: none;
  border: none;
  color: ${Colors.GREY};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: ${Colors.DARK_GREY};
  }

  &:focus {
    outline: none;
  }

  svg {
    font-size: 1.2rem;
  }
`;

export default {};
