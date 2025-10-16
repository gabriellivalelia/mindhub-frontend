import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  ButtonContainer,
  DropDownContainer,
  ImageProfile,
  ImageProfileContainer,
  Logo,
  LogoContainer,
  MainContainer,
  NavBar,
  NavBarHover,
} from "./styles";
import LogoSrc from "../../assets/logo.png";
import ProfileSrc from "../../assets/profile.jpeg";
import AccountMenu from './accountMenu';
import { Colors, FontSizes } from "../../globalConfigs";
import { getToken } from "../../utils/auth";

function Header() {

  const authenticated = !!getToken();
  const navigate = useNavigate();
 
  return (
      <MainContainer>
        <LogoContainer>
          <Logo src={LogoSrc} />
        </LogoContainer>
        <NavBar authenticated={authenticated}>
          <Link to="/">
            <NavBarHover>Home</NavBarHover>
          </Link>
          <Link to="/appointmentsPatient">
            <NavBarHover>Consultas</NavBarHover>
          </Link>
          <Link to="/contents">
            <NavBarHover>Conteúdos</NavBarHover>
          </Link>
        </NavBar>
        <ButtonContainer authenticated={authenticated}>
          <Button
            onClick={() => navigate("/login")}
          >
            Entrar
          </Button>
        </ButtonContainer>
        <ImageProfileContainer authenticated={authenticated}>
          {authenticated ? (
            <AccountMenu avatarSrc={ProfileSrc} />
          ) : (
            <ImageProfile src={ProfileSrc} />
          )}
        </ImageProfileContainer>
      </MainContainer>
  );
}

export default Header;