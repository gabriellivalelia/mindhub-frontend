import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingOutlined } from "@ant-design/icons";
import PsychologyIcon from "@mui/icons-material/Psychology";
import RecordVoiceOver from "@mui/icons-material/RecordVoiceOver";

import {
  CreatePacientFormSchema,
  CreatePsychologistFormSchema,
} from "./createUserFormSchema";

import {
  Container,
  FormContainer,
  Form,
  FullWidthInputContainer, 
  Input,
  InputAndLabelBox,
  InputContainer,
  Label,
  LoaderBox,
  Message,
  PageContainer,
  StyledMaskInput,
  SubmitButton,
  Text,
  TextButton,
  TextButtonContainer,
  ToggleButton,
  ToggleContainer,
} from "./styles";

import { SubHeader } from "../../components";

import { stateOptions } from "./stateOptions";
import { cityOptions } from "./cityOptions";
import { approachOptions } from "./approachOptions";
import { specialtyOptions } from "./specialtyOptions";
import { genderOptions } from "./genderOptions";

import { FontSizes } from "../../globalConfigs";

import Select from 'react-select'

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "none",     
    boxShadow: "none",   
    minHeight: "22px",    
    height: "22px",
    fontSize: FontSizes.SMALLEST
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "22px",
    padding: "0.25rem 0",    
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,            
    padding: 0,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "22px",
  }),
};


function Register() {
  const [userType, setUserType] = useState("pacient");
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const currentSchema =
    userType === "pacient"
      ? CreatePacientFormSchema
      : CreatePsychologistFormSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(currentSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    reset();
    setRegisterError("");
  }, [userType, reset]);

  async function createUser(userData) {
    setLoading(true);
    setRegisterError("");
    console.log("Submitting User Data:", { ...userData, userType });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
  }


  return (
    <PageContainer>
      <SubHeader text="Cadastre-se!" />
      <Container>
        <FormContainer>
          <ToggleContainer>
            <ToggleButton
              type="button"
              active={userType === "pacient"}
              onClick={() => setUserType("pacient")}
            >
              <RecordVoiceOver />
              Paciente
            </ToggleButton>
            <ToggleButton
              type="button"
              active={userType === "psychologist"}
              onClick={() => setUserType("psychologist")}
            >
              <PsychologyIcon />
              Psicólogo
            </ToggleButton>
          </ToggleContainer>

          <Form onSubmit={handleSubmit(createUser)} noValidate>
            {/* --- NOME COMPLETO AGORA OCUPA A LARGURA TODA --- */}
            <FullWidthInputContainer>
              <InputAndLabelBox>
                <Label htmlFor="name">NOME COMPLETO</Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome completo"
                  {...register("name")}
                />
              </InputAndLabelBox>
              {errors.name && <Message>{errors.name.message}</Message>}
            </FullWidthInputContainer>

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="birthDate">DATA DE NASCIMENTO</Label>
                <StyledMaskInput
                  id="birthDate"
                  mask="00/00/0000"
                  placeholder="dd/mm/aaaa"
                  {...register("birthDate")}
                />
              </InputAndLabelBox>
              {errors.birthDate && (
                <Message>{errors.birthDate.message}</Message>
              )}
            </InputContainer>

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="cpf">CPF</Label>
                <StyledMaskInput
                  id="cpf"
                  mask="000.000.000-00"
                  placeholder="000.000.000-00"
                  {...register("cpf")}
                />
              </InputAndLabelBox>
              {errors.cpf && <Message>{errors.cpf.message}</Message>}
            </InputContainer>

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="phone">TELEFONE</Label>
                <StyledMaskInput
                  id="phone"
                  mask="(00) 00000-0000"
                  placeholder="(00) 00000-0000"
                  {...register("phone")}
                />
              </InputAndLabelBox>
              {errors.phone && <Message>{errors.phone.message}</Message>}
            </InputContainer>

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="gender">GÊNERO</Label>
                  <Select id="gender" {...register("gender")}
                    options={genderOptions}
                    styles={customStyles}
                    placeholder="Selecione..."
                  />
              </InputAndLabelBox>
              {errors.address && <Message>{errors.address.message}</Message>}
            </InputContainer>

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="state">ESTADO</Label>
                <Select id="state" {...register("state")}
                    options={stateOptions}
                    styles={customStyles}
                    placeholder="Selecione..."
                />
              </InputAndLabelBox>
              {errors.state && <Message>{errors.state.message}</Message>}
            </InputContainer>

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="city">CIDADE</Label>
                <Select id="city" {...register("city")}
                  options={cityOptions}
                  styles={customStyles}
                  placeholder="Selecione..."
                />
              </InputAndLabelBox>
              {errors.address && <Message>{errors.address.message}</Message>}
            </InputContainer>

            {userType === "psychologist" && (
              <>
                <InputContainer>
                  <InputAndLabelBox>
                    <Label htmlFor="crp">CRP</Label>
                    <StyledMaskInput
                      id="crp"
                      mask="00/000000"
                      {...register("crp")}
                      placeholder="00/000000"
                    />
                  </InputAndLabelBox>
                  {errors.crp && <Message>{errors.crp.message}</Message>}
                </InputContainer>
                <InputContainer>
                  <InputAndLabelBox>
                    <Label htmlFor="approaches">ABORDAGEM</Label>
                    <Select id="approaches" {...register("approaches")}
                      options={approachOptions}
                      styles={customStyles}
                      isMulti
                      placeholder="Selecione..."
                    />
                  </InputAndLabelBox>
                  {errors.approach && (
                    <Message>{errors.approach.message}</Message>
                  )}
                </InputContainer>
              </>
            )}

           {userType === "psychologist" && (<>
            <FullWidthInputContainer>
              <InputAndLabelBox>
                <Label htmlFor="specialties">ESPECIALIDADES</Label>
                <Select id="specialties" {...register("specialties")}
                  options={specialtyOptions}
                  styles={customStyles}
                  isMulti
                  placeholder="Selecione..."
                />
              </InputAndLabelBox>
              {errors.email && <Message>{errors.email.message}</Message>}
            </FullWidthInputContainer>
           </>)}

           <FullWidthInputContainer>
              <InputAndLabelBox>
                <Label htmlFor="email">E-MAIL</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  {...register("email")}
                />
              </InputAndLabelBox>
              {errors.email && <Message>{errors.email.message}</Message>}
            </FullWidthInputContainer>

            <FullWidthInputContainer>
              <InputAndLabelBox>
                <Label htmlFor="confirmedEmail">CONFIRME SEU E-MAIL</Label>
                <Input
                  id="confirmedEmail"
                  type="email"
                  placeholder="Repita seu e-mail"
                  {...register("confirmedEmail")}
                />
              </InputAndLabelBox>
              {errors.confirmedEmail && (
                <Message>{errors.confirmedEmail.message}</Message>
              )}
            </FullWidthInputContainer>

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="password">SENHA</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Crie uma senha forte"
                  {...register("password")}
                />
              </InputAndLabelBox>
              {errors.password && <Message>{errors.password.message}</Message>}
            </InputContainer>

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="confirmedPassword">CONFIRME SUA SENHA</Label>
                <Input
                  id="confirmedPassword"
                  type="password"
                  placeholder="Repita sua senha"
                  {...register("confirmedPassword")}
                />
              </InputAndLabelBox>
              {errors.confirmedPassword && ( 
                <Message>{errors.confirmedPassword.message}</Message>
              )}
            </InputContainer>

            <Message
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                height: "auto",
              }}
            >
              {registerError}
            </Message>

            {loading ? (
              <LoaderBox>
                <LoadingOutlined />
              </LoaderBox>
            ) : (
              <SubmitButton type="submit" value="Cadastrar" />
            )}
          </Form>
          <TextButtonContainer>
            <Text>Já tem uma conta?</Text>
          <TextButton onClick={() => navigate("/Login")}>
          Entre por aqui
          </TextButton>
          </TextButtonContainer>
        </FormContainer>
      </Container>
    </PageContainer>
  );
}

export default Register;
