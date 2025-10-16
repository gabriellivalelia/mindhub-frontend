import styled from "styled-components";
import { BreakPoints, Colors, FontSizes } from "../../globalConfigs";

export const MainContainer = styled.div`
  align-items: center;
  background: transparent;
  display: flex;
  flex-direction: row;
  height: 120px;
  justify-content: space-between;
  padding: 1%;
`;

export const LogoContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: start;

  @media (max-width: ${BreakPoints.MOBILE}) {
    min-width: 65%;
  }
`;

export const Logo = styled.img`
  height: 75%;

  @media (max-width: ${BreakPoints.MOBILE}) {
    height: 45px;
  }
`;

export const NavBar = styled.div`
  background: transparent;
  display: ${(props) => (props.authenticated ? "flex" : "none")};
  flex-direction: row;
  font-size: ${FontSizes.MEDIUM};
  justify-content: space-around;
  width: 85%;

  a:-webkit-any-link {
    color: ${Colors.ORANGE};
    cursor: pointer;
    text-decoration: underline;
  }

  @media (max-width: ${BreakPoints.MOBILE}) {
    display: none;
  }
`;

export const NavBarHover = styled.div`
  &:hover {
    font-weight: bold;
  }
`;

export const DropDownContainer = styled.div`
  display: none;

  @media (max-width: ${BreakPoints.MOBILE}) {
    align-items: center;
    background: ${Colors.LIGHT_ORANGE};
    border-radius: 50%;
    display: ${(props) => (props.authenticated ? "flex" : "none")};
    flex-direction: row;
    height: 45px;
    justify-content: center;
    padding: 2%;
    width: 45px;
  }
`;

export const ButtonContainer = styled.div`
  align-items: center;
  display: ${(props) => (props.authenticated && "none") || "flex"};
  flex-direction: row;
  height: 100%;
  justify-content: center;
`;

export const Button = styled.button`
  background: ${Colors.ORANGE};
  border: 1px solid ${Colors.BROWN};
  border-radius: 5px;
  color: ${Colors.WHITE};
  font-size: ${FontSizes.NORMAL};
  height: 45px;
  min-width: 120px;
  width: 20%;

  &:hover {
    background-color: ${Colors.BROWN};
    cursor: pointer;
  }
`;

export const ImageProfileContainer = styled.div`
  align-items: center;
  display: ${(props) => (props.authenticated && "flex") || "none"};
  flex-direction: row;
  height: 100%;
  justify-content: center;
`;

export const ImageProfile = styled.img`
  border-radius: 50%;
  height: 85%;
  min-width: 56px;
  min-height: 56px;
  max-width: 72px;
  max-height: 72px;

  @media (max-width: ${BreakPoints.MOBILE}) {
    height: 48px;
    min-width: 48px;
    min-height: 48px;
  }

  &:hover {
    cursor: pointer;
  }
`;
