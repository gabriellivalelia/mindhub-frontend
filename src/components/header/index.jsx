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
import { useCurrentUser } from "../../services/useCurrentUser";

function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data: user, isError } = useCurrentUser();
  const navigate = useNavigate();

  // Considera autenticado apenas se tiver token E user válido
  const isActuallyAuthenticated = isAuthenticated && user && !isError;

  return (
    <MainContainer>
      <LogoContainer>
        <Logo src={LogoSrc} />
      </LogoContainer>
      <NavBar authenticated={isActuallyAuthenticated}>
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
      <ButtonContainer authenticated={isActuallyAuthenticated}>
        <Button onClick={() => navigate("/login")}>Entrar</Button>
      </ButtonContainer>
      <ImageProfileContainer authenticated={isActuallyAuthenticated}>
        {isActuallyAuthenticated && (
          <AccountMenu avatarSrc={user?.profile_picture?.src} />
        )}
      </ImageProfileContainer>
    </MainContainer>
  );
}

export default Header;
