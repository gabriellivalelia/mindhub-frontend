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
  LoaderBox,
  LogoContainer,
  Logo,
  TextButtonContainer,
  Text,
  TextButton,
  CopyContainer,
  PasswordInputWrapper,
  PasswordToggleIcon,
} from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { LoginFormSchema } from "./loginFormSchema";
import GoogleIconsSrc from "../../assets/googleIcon.png";
import LogoSrc from "../../assets/logo.png";
import { authService } from "../../services/authService";
import { HTTP_STATUS } from "../../utils/constants";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
  });

  async function handleLogin(data) {
    setLoading(true);

    const result = await authService.login(data.email, data.password);
    if (result.success) {
      console.log("Login bem-sucedido!", result.data);
      navigate("/");
    } else {
      if (result.error?.status === HTTP_STATUS.UNAUTHORIZED) {
        setLoginError("E-mail ou senha incorretos.");
      } else {
        setLoginError("Erro ao fazer login. Tente novamente mais tarde.");
      }
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
          <Form onSubmit={handleSubmit(handleLogin)}>
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
                <PasswordInputWrapper>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Senha"
                    {...register("password")}
                    autoComplete="off"
                  />
                  <PasswordToggleIcon
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </PasswordToggleIcon>
                </PasswordInputWrapper>
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
