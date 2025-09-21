import styled from "styled-components";
import { BreakPoints, Colors, FontSizes } from "../../globalConfigs";
import { IMaskInput } from "react-imask";
import createGlobalStyle from "styled-components";
import { Select } from "@mobiscroll/react";

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

export const ToggleContainer = styled.div`
  display: flex;
  background-color: "transparent";
  border: 2px solid ${Colors.GREY};
  border-radius: 8px;
  min-width: 90%;
  overflow: hidden;
`;

export const ToggleButton = styled.button`
  align-items: center;
  background: ${(props) => (props.active ? Colors.GREY : "transparent")};
  border: none;
  color: ${(props) => (props.active ? Colors.WHITE : Colors.GREY)};
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

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
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
  padding: 0.6rem 0.8rem;
  transition: all 0.2s ease-in-out;

  display: flex;
  flex-direction: column;
  justify-content: center;
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

// export const Select = styled.select`
//   ${commonInputStyles}
//   appearance: none;
//   background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
//   background-repeat: no-repeat;
//   background-position: right 10px top 50%;
//   background-size: 0.65em auto;
//   padding-right: 25px;
// `;

export const StyledMaskInput = styled(IMaskInput)`
  ${commonInputStyles}
`;

export const SubmitButton = styled.input`
  grid-column: 1 / -1;
  justify-self: center;
  width: 50%;
  min-width: 200px;
  height: 45px;
  background: #2dbf64;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 1.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #28a758;
  }
`;

export const LoaderBox = styled.div`
  grid-column: 1 / -1;
  justify-self: center;
  width: 50%;
  min-width: 200px;
  height: 45px;
  background: #2dbf64;
  color: white;
  border-radius: 8px;
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

export const Message = styled.p`
  color: red;
  font-size: 0.75rem;
  margin: 0;
  height: 1rem;
`;

export const TextButton = styled.button`
  margin-top: 1.5rem;
  background: transparent;
  border: none;
  text-decoration: underline;
  color: #ff7f50;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
`;
