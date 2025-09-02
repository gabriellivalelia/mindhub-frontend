import styled from "styled-components";
import { BreakPoints, Colors, FontSizes } from "../../globalConfigs";

export const MainContainer = styled.div`
  align-items: left;
  background: none;
  display: flex;
  flex-direction: column;
  gap: 5%;
  height: 100%;
  justify-content: center;
  padding: 2%;
  width: 100vw;
`;

export const TextContainer = styled.div`
  width: 50%;

  @media (max-width: ${BreakPoints.MOBILE}) {
    width: 60%;
  }
`;

export const Text = styled.span`
  color: ${(props) => (props.highlight ? Colors.PURPLE : Colors.ORANGE)};
  font-size: ${FontSizes.XXXLARGE};
  font-weight: ${(props) => (props.highlight ? "bold" : "normal")};

  @media (max-width: ${BreakPoints.TABLET}) {
    font-size: ${FontSizes.XLARGE};
  }
`;

export const Button = styled.button`
  background: ${Colors.BROWN};
  border: 1px solid ${Colors.PURPLE};
  border-radius: 5px;
  color: ${Colors.WHITE};
  font-size: ${FontSizes.LARGE};
  height: 80px;
  min-width: 120px;
  width: 30%;

  @media (max-width: ${BreakPoints.MOBILE}) {
    font-size: ${FontSizes.MEDIUM};
    height: 60px;
    width: 55%;
  }
        
  &:hover {
    background-color: ${Colors.PURPLE};
    cursor: pointer;
  }
`;

export const TextButton = styled.button`
  background: none;
  border: none;
  color: ${Colors.BROWN};
  font-size: ${FontSizes.LARGE};
  padding: 0;
  text-decoration: underline;
  width: fit-content;

  @media (max-width: ${BreakPoints.MOBILE}) {
    font-size: ${FontSizes.MEDIUM};
    text-align: left;
    width: 55%;
  }

  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;
