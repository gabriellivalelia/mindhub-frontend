import {
  MainContainer,
  TextContainer,
  Button,
  Text,
  TextButton,
} from "./styles";
import { Link, useNavigate } from "react-router-dom";

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
