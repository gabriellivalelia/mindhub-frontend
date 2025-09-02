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
import Dropdown from "antd/es/dropdown/dropdown";
import { DropDownOptions } from "./dropDownOptions";
import { MoreOutlined } from "@ant-design/icons";
import { Colors, FontSizes } from "../../globalConfigs";

function Header() {
 
  const authenticated = false; //TO DO: Autenticação
  const dropDownOptions = DropDownOptions(authenticated);
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
          <Link to="/consultations">
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
          <ImageProfile src={ProfileSrc} />
        </ImageProfileContainer>
        <DropDownContainer authenticated={authenticated}>
          <Dropdown
            menu={{
              dropDownOptions,
            }}
            placement="bottom"
          >
            <MoreOutlined
              style={{
                fontSize: FontSizes.LARGE,
                color: Colors.WHITE,
              }}
            />
          </Dropdown>
        </DropDownContainer>
      </MainContainer>
  );
}

export default Header;