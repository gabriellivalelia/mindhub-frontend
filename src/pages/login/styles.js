import styled from "styled-components";
import { BreakPoints, Colors, FontSizes } from "../../globalConfigs";

export const MainContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 100vh;
  justify-content: center;
  width: 100vw;

  @media (max-width: ${BreakPoints.TABLET}) {
    flex-direction: column-reverse;
  }
`;

export const LeftContainer = styled.div`
  align-items: center;
  background-color: ${Colors.LIGHT_ORANGE};
  display: flex;
  flex-direction: column;
  gap: 5%;
  height: 100%;
  justify-content: center;
  padding: 10% 0% 10% 0%;
  width: 45%;

  @media (max-width: ${BreakPoints.TABLET}) {
    height: 90%;
    width: 100%;
  }
`;

export const RightContainer = styled.div`
  align-items: center;
  background-color: ${Colors.WHITE};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 55%;

  @media (max-width: ${BreakPoints.TABLET}) {
    height: 10%;
    width: 100%;
  }
`;

export const GoogleButton = styled.button`
  align-items: center;
  background-color: ${Colors.PURPLE};
  border: solid 1px ${Colors.WHITE};
  border-radius: 48px;
  color: ${Colors.BLACK};
  display: flex;
  flex-direction: row;
  font-size: ${FontSizes.NORMAL};
  gap: 10px;
  height: 45px;
  min-height: 45px;
  justify-content: center;
  width: 55%;

  @media (max-width: ${BreakPoints.TABLET}) {
    width: 60%;
  }

  @media (max-width: ${BreakPoints.MOBILE}) {
    width: 75%;
  }

  &:hover {
    background-color: ${Colors.GREY};
    cursor: pointer;
  }
`;

export const GoogleIcon = styled.img`
  height: 32px;
`;

export const DividerContainer = styled.div`
  align-items: center;
  display: flex;
  width: 65%;

  @media (max-width: ${BreakPoints.TABLET}) {
    width: 70%;
  }

  @media (max-width: ${BreakPoints.MOBILE}) {
    width: 80%;
  }
`;

export const Line = styled.div`
  background: ${Colors.WHITE};
  flex: 1;
  height: 1px;
`;

export const TextDivider = styled.span`
  background: ${Colors.WHITE};
  color: ${Colors.GREY};
  font-size: 14px;
  font-weight: 500;
  padding: 1%;
`;

export const LogoContainer = styled.div`
  align-items: center;
  display: flex;
  height: 25%;
  justify-content: center;

  @media (max-width: ${BreakPoints.TABLET}) {
    width: 100%;
  }
`;

export const Logo = styled.img`
  max-height: 50%;
  max-width: 95%;

  @media (max-width: ${BreakPoints.TABLET}) {
    height: auto;
    max-height: fit-content;
    width: 25%;
  }
`;

export const FormContainer = styled.div`
  align-items: center;
  background: transparent;
  display: flex;
  flex-direction: column;
  padding: 5%;
  text-align: center;
  width: 70%;

  @media (max-width: ${BreakPoints.TABLET}) {
    width: 75%;
  }

  @media (max-width: ${BreakPoints.MOBILE}) {
    width: 90%;
  }
`;

export const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left;
  width: 100%;
`;

export const InputAndLabelBox = styled.div`
  background: ${Colors.WHITE};
  border-radius: 5px;
  padding: 2%;
`;

export const Input = styled.input`
  border: none;
  box-sizing: border-box;
  padding: 2%;
  width: 100%;
`;

export const Label = styled.label`
  color: ${Colors.GREY};
  font-size: ${FontSizes.SMALL};
`;

export const SubmitButton = styled.input`
  background: ${Colors.GREEN};
  border: solid 1px ${Colors.BROWN};
  border-radius: 5px;
  color: ${Colors.WHITE};
  font-size: ${FontSizes.NORMAL};
  height: 45px;
  width: 100%;

  &:hover {
    background-color: ${Colors.BROWN};
    cursor: pointer;
  }
`;

export const Message = styled.div`
  color: ${Colors.RED};
  font-size: ${FontSizes.SMALLEST};
  width: 100%;
`;

//TO DO: Implementar após implementação da autenticação
// export const LoaderBox = styled.div`
//   width: 50%;
//   min-width: 120px;
//   height: 32px;
//   background: #ffa40d;
//   color: white;
//   border: solid 1px;
//   border-color: white;
//   border-radius: 0.625rem;
//   margin-top: 2%;

//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

export const TextButtonContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Text = styled.span`
  color: ${Colors.GREEN};
  font-size: ${FontSizes.MEDIUM};
  font-weight: bold;
`;

export const TextButton = styled.button`
  background: none;
  border: none;
  color: ${Colors.WHITE};
  font-size: ${FontSizes.MEDIUM};
  font-weight: bold;
  padding: 0;
  text-decoration: underline;
  width: fit-content;

  @media (max-width: ${BreakPoints.MOBILE}) {
    font-size: ${FontSizes.NORMAL};
    text-align: left;
    width: 55%;
  }

  &:hover {
    cursor: pointer;
    font-weight: bolder;
  }
`;

export const CopyContainer = styled.div`
  color: ${Colors.WHITE};
  font-size: ${FontSizes.SMALLEST};
  margin-top: 5%;
`;
