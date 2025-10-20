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
import AccountMenu from "./accountMenu";
import { useAuthStore } from "../../stores/useAuthStore";

function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <MainContainer>
      <LogoContainer>
        <Logo src={LogoSrc} />
      </LogoContainer>
      <NavBar authenticated={isAuthenticated}>
        <Link to="/">
          <NavBarHover>Home</NavBarHover>
        </Link>
        <Link to="/appointments">
          <NavBarHover>Consultas</NavBarHover>
        </Link>
        <Link to="/contents">
          <NavBarHover>Conteúdos</NavBarHover>
        </Link>
      </NavBar>
      <ButtonContainer authenticated={isAuthenticated}>
        <Button onClick={() => navigate("/login")}>Entrar</Button>
      </ButtonContainer>
      <ImageProfileContainer authenticated={isAuthenticated}>
        {isAuthenticated && (
          <AccountMenu avatarSrc={user?.profile_picture?.src} />
        )}
      </ImageProfileContainer>
    </MainContainer>
  );
}

export default Header;
