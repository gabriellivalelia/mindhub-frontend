import {
  MainContainer,
  LeftContainer,
  RightContainer,
  GoogleButton,
  GoogleIcon,
  DividerContainer,
  Line,
  TextDivider,
  FormContainer,
  Form,
  InputContainer,
  InputAndLabelBox,
  Input,
  Label,
  Message,
  SubmitButton,
  LogoContainer,
  Logo,
  TextButtonContainer,
  Text,
  TextButton,
  CopyContainer,
} from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { LoginFormSchema } from "./loginFormSchema";
import GoogleIconsSrc from "../../assets/googleIcon.png";
import LogoSrc from "../../assets/logo.png";
import { setToken, setUserType } from "../../utils/auth";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
  });

  async function getLogin(data) {
    setLoading(true);

    try {
      if (
        (data.email === "patient@gmail.com" &&
        data.password === "12345678") || (data.email === "psychologist@gmail.com" &&
        data.password === "12345678")
      ) {
        const fakeToken = "fake-jwt-token-123456";
        const demoUserType = data.email.includes('patient') ? 'patient' : 'psychologist';

        setToken(fakeToken);
        setUserType(demoUserType);
        navigate("/");
      } else {
        alert(`Dados inválidos.`);
      }
    } catch (error) {
      console.error(
        "Erro ao fazer login:",
        error?.response?.data?.message || "Erro ao fazer Login"
      );
      setLoginError(error?.response?.data?.message || "Erro ao fazer Login");
    }

    setLoading(false);
  }

  return (
    <MainContainer>
      <LeftContainer>
        {/* <GoogleButton>
          <GoogleIcon src={GoogleIconsSrc} />
          Entrar com Google
        </GoogleButton>
        <DividerContainer>
          <Line />
          <TextDivider>Ou</TextDivider>
          <Line />
        </DividerContainer> */}
        <FormContainer>
          <Form onSubmit={handleSubmit(getLogin)}>
            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="email">E-MAIL</Label>
                <Input
                  id="email"
                  placeholder="E-mail"
                  {...register("email")}
                  autoComplete="off"
                />
              </InputAndLabelBox>
              {errors.email && <Message>{errors.email.message}</Message>}
            </InputContainer>
            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="password">SENHA</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Senha"
                  {...register("password")}
                  autoComplete="off"
                />
              </InputAndLabelBox>
              {errors.password && <Message>{errors.password.message}</Message>}
            </InputContainer>
            <Message>{loginError}</Message>
            {loading ? (
              <LoaderBox>
                <LoadingOutlined spin />
              </LoaderBox>
            ) : (
              <SubmitButton type="submit" value="Entrar" />
            )}
          </Form>
        </FormContainer>
        <TextButtonContainer>
          <Text>Ainda não é cadastrado?</Text>
          <TextButton onClick={() => navigate("/register")}>
            Crie uma conta
          </TextButton>
        </TextButtonContainer>
        <CopyContainer>Copyright &copy; 2025 MindHub</CopyContainer>
      </LeftContainer>
      <RightContainer>
        <LogoContainer>
          <Logo src={LogoSrc} />
        </LogoContainer>
      </RightContainer>
    </MainContainer>
  );
}

export default Login;
