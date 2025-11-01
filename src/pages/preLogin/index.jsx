import {
  MainContainer,
  TextContainer,
  Button,
  Text,
  TextButton,
} from "./styles";
import { Link, useNavigate } from "react-router-dom";

/**
 * Componente PreLogin - Página inicial/landing page para visitantes não autenticados.
 *
 * Exibe:
 * - Slogan/mensagem principal do MindHub
 * - Botão para agendar consulta (redireciona para login)
 * - Link para registro de psicólogos
 *
 * Esta é a primeira página vista por usuários que acessam o site sem estar logados.
 *
 * @component
 * @returns {JSX.Element} Landing page de apresentação
 */
function PreLogin() {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <TextContainer>
        <Text highlight={false}>Terapia que acompanha o </Text>
        <Text highlight={true}>seu </Text>
        <Text highlight={false}>ritmo, onde quer que </Text>
        <Text highlight={true}>você </Text>
        <Text highlight={false}>esteja.</Text>
      </TextContainer>
      <Button onClick={() => navigate("/login")}>Agendar consulta</Button>
      <TextButton onClick={() => navigate("/register?type=psychologist")}>
        Seja um Psicólogo associado
      </TextButton>
    </MainContainer>
  );
}

export default PreLogin;
