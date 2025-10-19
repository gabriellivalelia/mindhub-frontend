import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
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
  FullMessage,
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
import Colors from "../../globalConfigs/globalStyles/colors";

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
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? Colors.ORANGE : state.isFocused ? Colors.LIGHT_ORANGE : provided.backgroundColor,
    color: state.isSelected ? Colors.WHITE : provided.color,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: Colors.DARK_GREY,
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: Colors.ORANGE,
    color: Colors.WHITE,
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: Colors.WHITE,
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: Colors.WHITE,
    ':hover': {
      backgroundColor: Colors.LIGHT_ORANGE,
      color: Colors.WHITE,
    }
  }),
};


function Register() {
  const [userType, setUserType] = useState("patient");
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const currentSchema =
    userType === "patient"
      ? CreatePacientFormSchema
      : CreatePsychologistFormSchema;

  const {
    register,
    control,
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

    const normalizeSelect = (v) => {
      if (v == null) return undefined;
      if (typeof v === 'string') return v;
      if (typeof v === 'object') return v.value ?? v.label;
      return undefined;
    };

    const normalizeMulti = (arr) => {
      if (!arr) return [];
      if (!Array.isArray(arr)) return [];
      return arr.map((item) => (typeof item === 'object' ? (item.value ?? item.label) : item));
    };

    const payload = {
      ...userData,
      userType,
      gender: normalizeSelect(userData.gender),
      state: normalizeSelect(userData.state),
      city: normalizeSelect(userData.city),
      approaches: userData.approaches ? normalizeMulti(userData.approaches) : undefined,
      specialties: userData.specialties ? normalizeMulti(userData.specialties) : undefined,
    };

    console.log("Submitting User Data:", payload);
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
              active={userType === "patient"}
              onClick={() => setUserType("patient")}
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
                <Input
                  id="birthDate"
                  type="date"
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
                <Controller
                  name="cpf"
                  control={control}
                  render={({ field }) => (
                    <StyledMaskInput
                      id="cpf"
                      mask="000.000.000-00"
                      placeholder="000.000.000-00"
                      value={field.value || ""}
                      onAccept={(value) => field.onChange(value)}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  )}
                />
              </InputAndLabelBox>
              {errors.cpf && <Message>{errors.cpf.message}</Message>}
            </InputContainer>

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="phone">TELEFONE</Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <StyledMaskInput
                      id="phone"
                      mask="(00) 00000-0000"
                      placeholder="(00) 00000-0000"
                      value={field.value || ""}
                      onAccept={(value) => field.onChange(value)}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  )}
                />
              </InputAndLabelBox>
              {errors.phone && <Message>{errors.phone.message}</Message>}
            </InputContainer>

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="gender">GÊNERO</Label>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={genderOptions}
                          styles={customStyles}
                          placeholder="Selecione..."
                        />
                      )}
                    />
              </InputAndLabelBox>
                {errors.gender && <Message>{errors.gender.message}</Message>}
            </InputContainer>

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="state">ESTADO</Label>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={stateOptions}
                      styles={customStyles}
                      placeholder="Selecione..."
                    />
                  )}
                />
              </InputAndLabelBox>
              {errors.state && <Message>{errors.state.message}</Message>}
            </InputContainer>

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="city">CIDADE</Label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={cityOptions}
                      styles={customStyles}
                      placeholder="Selecione..."
                    />
                  )}
                />
              </InputAndLabelBox>
              {errors.city && <Message>{errors.city.message}</Message>}
            </InputContainer>

            {userType === "psychologist" && (
              <>
                <InputContainer>
                  <InputAndLabelBox>
                    <Label htmlFor="crp">CRP</Label>
                        <Controller
                          name="crp"
                          control={control}
                          render={({ field }) => (
                            <StyledMaskInput
                              id="crp"
                              mask="00/000000"
                              placeholder="00/000000"
                              value={field.value || ""}
                              onAccept={(value) => field.onChange(value)}
                              onBlur={field.onBlur}
                              ref={field.ref}
                            />
                          )}
                        />
                  </InputAndLabelBox>
                  {errors.crp && <Message>{errors.crp.message}</Message>}
                </InputContainer>
                <FullWidthInputContainer>
                  <InputAndLabelBox>
                    <Label htmlFor="approaches">ABORDAGEM</Label>
                    <Controller
                      name="approaches"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={approachOptions}
                          styles={customStyles}
                          isMulti
                          placeholder="Selecione..."
                        />
                      )}
                    />
                  </InputAndLabelBox>
                  {errors.approaches && (
                    <Message>{errors.approaches.message}</Message>
                  )}
                </FullWidthInputContainer>
              </>
            )}

           {userType === "psychologist" && (<>
            <FullWidthInputContainer>
              <InputAndLabelBox>
                <Label htmlFor="specialties">ESPECIALIDADES</Label>
                <Controller
                  name="specialties"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={specialtyOptions}
                      styles={customStyles}
                      isMulti
                      placeholder="Selecione..."
                    />
                  )}
                />
              </InputAndLabelBox>
              {errors.specialties && <Message>{errors.specialties.message}</Message>}
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

            <FullMessage>{registerError}</FullMessage>

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
