import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  ButtonContainer,
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

/**
 * Componente Header - Cabeçalho principal da aplicação.
 *
 * Exibe navegação diferenciada dependendo do estado de autenticação:
 * - Usuário não autenticado: Logo + Navegação + Botão "Entrar"
 * - Usuário autenticado: Logo + Navegação + Menu de perfil com avatar
 *
 * Links de navegação:
 * - Home: Dashboard principal
 * - Consultas: Lista de consultas (paciente ou psicólogo)
 * - Conteúdos: Área de conteúdos educacionais
 *
 * @component
 * @returns {JSX.Element} Cabeçalho da aplicação
 */
function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data: user, isError } = useCurrentUser();
  const navigate = useNavigate();

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
