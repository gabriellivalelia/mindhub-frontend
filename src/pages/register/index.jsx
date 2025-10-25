import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingOutlined } from "@ant-design/icons";
import PsychologyIcon from "@mui/icons-material/Psychology";
import RecordVoiceOver from "@mui/icons-material/RecordVoiceOver";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useToastStore } from "../../stores/useToastStore";

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
  PasswordInputWrapper,
  PasswordToggleIcon,
} from "./styles";

import { SubHeader } from "../../components";

import { genderOptions } from "./genderOptions";
import { audiencesOptions } from "./audiencesOptions";

import { FontSizes } from "../../globalConfigs";
import Colors from "../../globalConfigs/globalStyles/colors";

import Select from "react-select";
import {
  useRegisterPatient,
  useRegisterPsychologist,
  useStates,
  useCitiesByState,
} from "../../services/registrationService";
import { useSpecialties } from "../../services/useSpecialties";
import { useApproaches } from "../../services/useApproaches";
import { authService } from "../../services/authService";

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    minHeight: "22px",
    height: "22px",
    fontSize: FontSizes.SMALLEST,
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
    backgroundColor: state.isSelected
      ? Colors.ORANGE
      : state.isFocused
        ? Colors.LIGHT_ORANGE
        : provided.backgroundColor,
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
    ":hover": {
      backgroundColor: Colors.LIGHT_ORANGE,
      color: Colors.WHITE,
    },
  }),
};

function Register() {
  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);
  const searchParams = new URLSearchParams(window.location.search);
  const typeFromUrl = searchParams.get("type");

  const [userType, setUserType] = useState(
    typeFromUrl === "psychologist" ? "psychologist" : "patient"
  );
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const registerPatientMutation = useRegisterPatient();
  const registerPsychologistMutation = useRegisterPsychologist();

  const { data: statesData, isLoading: loadingStates } = useStates();
  const { data: citiesData, isLoading: loadingCities } =
    useCitiesByState(selectedState);
  const { data: specialtiesData, isLoading: loadingSpecialties } =
    useSpecialties({ size: 100 });
  const { data: approachesData, isLoading: loadingApproaches } = useApproaches({
    size: 100,
  });

  const stateOptions =
    statesData?.items?.map((state) => ({
      value: state.id,
      label: state.name,
    })) || [];

  const cityOptions =
    citiesData?.map((city) => ({
      value: city.id,
      label: city.name,
    })) || [];

  const specialtyOptions =
    specialtiesData?.items?.map((specialty) => ({
      value: specialty.id,
      label: specialty.name,
    })) || [];

  const approachOptions =
    approachesData?.items?.map((approach) => ({
      value: approach.id,
      label: approach.name,
    })) || [];

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
    setValue,
  } = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      name: "",
      birthDate: "",
      cpf: "",
      phone: "",
      gender: null,
      state: null,
      city: null,
      email: "",
      confirmedEmail: "",
      password: "",
      confirmedPassword: "",
      ...(userType === "psychologist" && {
        crp: "",
        valuePerAppointment: "",
        approaches: null,
        specialties: null,
        audiences: null,
        description: "",
      }),
    },
  });

  useEffect(() => {
    // Reset com valores padrão limpos
    reset({
      name: "",
      birthDate: "",
      cpf: "",
      phone: "",
      gender: null,
      state: null,
      city: null,
      email: "",
      confirmedEmail: "",
      password: "",
      confirmedPassword: "",
      ...(userType === "psychologist" && {
        crp: "",
        valuePerAppointment: "",
        approaches: null,
        specialties: null,
        audiences: null,
        description: "",
      }),
    });
    setRegisterError("");
    setSelectedState(null);
  }, [userType, reset]);

  // Resetar cidade quando estado muda
  useEffect(() => {
    setValue("city", null);
  }, [selectedState, setValue]);

  async function createUser(userData) {
    setLoading(true);
    setRegisterError("");

    try {
      const normalizeSelect = (v) => {
        if (v == null) return undefined;
        if (typeof v === "string") return v;
        if (typeof v === "object") return v.value ?? v.label;
        return undefined;
      };

      const normalizeMulti = (arr) => {
        if (!arr) return [];
        if (!Array.isArray(arr)) return [];
        return arr.map((item) =>
          typeof item === "object" ? (item.value ?? item.label) : item
        );
      };

      const payload = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        cpf: userData.cpf,
        phone: userData.phone,
        birthDate: userData.birthDate,
        gender: normalizeSelect(userData.gender),
        cityId: normalizeSelect(userData.city),
      };

      if (userType === "patient") {
        await registerPatientMutation.mutateAsync(payload);
      } else {
        const psychologistPayload = {
          ...payload,
          crp: userData.crp,
          valuePerAppointment: userData.valuePerAppointment,
          description:
            userData.description || "Psicólogo cadastrado no MindHub",
          specialties: userData.specialties
            ? normalizeMulti(userData.specialties)
            : [],
          approaches: userData.approaches
            ? normalizeMulti(userData.approaches)
            : [],
          audiences: userData.audiences
            ? normalizeMulti(userData.audiences)
            : [],
        };

        await registerPsychologistMutation.mutateAsync(psychologistPayload);
      }

      const loginResult = await authService.login(
        userData.email,
        userData.password
      );

      if (loginResult.success) {
        addToast(
          "Cadastro realizado com sucesso! Você já está logado.",
          "success"
        );
        navigate("/");
      } else {
        addToast(
          "Cadastro realizado com sucesso! Faça login para acessar sua conta.",
          "info"
        );
        navigate("/login");
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);

      let errorMessage =
        "Erro ao realizar cadastro. Por favor, tente novamente.";

      if (error.data?.errors) {
        if (Array.isArray(error.data.errors)) {
          errorMessage = error.data.errors.join(", ");
        } else if (typeof error.data.errors === "string") {
          errorMessage = error.data.errors;
        }
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.data?.detail) {
        errorMessage = error.data.detail;
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }

      setRegisterError(errorMessage);
      addToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageContainer>
      <SubHeader text="Cadastre-se" />
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
                <Input id="birthDate" type="date" {...register("birthDate")} />
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
                      isLoading={loadingStates}
                      onChange={(value) => {
                        field.onChange(value);
                        setSelectedState(value?.value || null);
                      }}
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
                      isLoading={loadingCities}
                      isDisabled={!selectedState}
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

                <InputContainer>
                  <InputAndLabelBox>
                    <Label htmlFor="valuePerAppointment">
                      VALOR POR CONSULTA (R$)
                    </Label>
                    <Input
                      id="valuePerAppointment"
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="150.00"
                      {...register("valuePerAppointment")}
                    />
                  </InputAndLabelBox>
                  {errors.valuePerAppointment && (
                    <Message>{errors.valuePerAppointment.message}</Message>
                  )}
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
                          isLoading={loadingApproaches}
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

            {userType === "psychologist" && (
              <>
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
                          isLoading={loadingSpecialties}
                        />
                      )}
                    />
                  </InputAndLabelBox>
                  {errors.specialties && (
                    <Message>{errors.specialties.message}</Message>
                  )}
                </FullWidthInputContainer>

                <FullWidthInputContainer>
                  <InputAndLabelBox>
                    <Label htmlFor="audiences">PÚBLICO-ALVO</Label>
                    <Controller
                      name="audiences"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={audiencesOptions}
                          styles={customStyles}
                          isMulti
                          placeholder="Selecione..."
                        />
                      )}
                    />
                  </InputAndLabelBox>
                  {errors.audiences && (
                    <Message>{errors.audiences.message}</Message>
                  )}
                </FullWidthInputContainer>
              </>
            )}

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
                <PasswordInputWrapper>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Crie uma senha forte"
                    {...register("password")}
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

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="confirmedPassword">CONFIRME SUA SENHA</Label>
                <PasswordInputWrapper>
                  <Input
                    id="confirmedPassword"
                    type={showConfirmedPassword ? "text" : "password"}
                    placeholder="Repita sua senha"
                    {...register("confirmedPassword")}
                  />
                  <PasswordToggleIcon
                    type="button"
                    onClick={() =>
                      setShowConfirmedPassword(!showConfirmedPassword)
                    }
                    aria-label={
                      showConfirmedPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                  >
                    {showConfirmedPassword ? <VisibilityOff /> : <Visibility />}
                  </PasswordToggleIcon>
                </PasswordInputWrapper>
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
