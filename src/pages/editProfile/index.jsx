import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { LoadingOutlined } from "@ant-design/icons";
import { useToastStore } from "../../stores/useToastStore";

import {
  PageContainer,
  Container,
  FormContainer,
  Form,
  FullWidthInputContainer,
  Input,
  InputAndLabelBox,
  InputContainer,
  Label,
  Message,
  FullMessage,
  StyledMaskInput,
  SubmitButton,
  LoaderBox,
  AvatarRow,
  AvatarPreview,
  AvatarUploadContainer,
  AvatarLabel,
  AvatarInput,
  TextButton,
  DescriptionTextArea,
} from "./styles";

import { SubHeader } from "../../components";
import { genderOptions } from "../register/genderOptions";
import { audiencesOptions } from "../register/audiencesOptions";
import { useCurrentUser } from "../../services/useCurrentUser";
import { useCurrentPatient } from "../../services/usePatients";
import { useCurrentPsychologist } from "../../services/usePsychologists";
import {
  useUpdatePatient,
  useUpdatePsychologist,
} from "../../services/useUpdateProfile";
import {
  useStates,
  useCitiesByState,
} from "../../services/registrationService";
import { useSpecialties } from "../../services/useSpecialties";
import { useApproaches } from "../../services/useApproaches";
import { FontSizes } from "../../globalConfigs";
import Colors from "../../globalConfigs/globalStyles/colors";

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

function EditProfile() {
  const addToast = useToastStore((state) => state.addToast);

  // Buscar dados básicos do usuário para determinar o tipo
  const { data: currentUser, isLoading: loadingUser } = useCurrentUser();
  const userType = currentUser?.type || "patient";

  // Buscar dados completos com base no tipo
  const { data: patientData, isLoading: loadingPatient } = useCurrentPatient();
  const { data: psychologistData, isLoading: loadingPsychologist } =
    useCurrentPsychologist();

  // Usar dados completos com base no tipo de usuário
  const profileData = userType === "patient" ? patientData : psychologistData;
  const loadingProfile =
    userType === "patient" ? loadingPatient : loadingPsychologist;

  const [loading, setLoading] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const updatePatientMutation = useUpdatePatient();
  const updatePsychologistMutation = useUpdatePsychologist();

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

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthDate: "",
      gender: null,
      state: null,
      city: null,
      crp: "",
      description: "",
      valuePerAppointment: "",
      specialties: [],
      approaches: [],
      audiences: [],
    },
  });

  // Preencher formulário quando profileData e opções carregarem
  useEffect(() => {
    if (!profileData) {
      return;
    }

    const formValues = {
      name: profileData.name || "",
      email: profileData.email || "",
      phone: profileData.phone_number || "",
    };

    // Formatar data de nascimento
    if (profileData.birth_date) {
      const date = new Date(profileData.birth_date);
      formValues.birthDate = date.toISOString().split("T")[0];
    }

    // Gênero
    if (profileData.gender) {
      const genderOption = genderOptions.find(
        (opt) => opt.value === profileData.gender
      );
      if (genderOption) {
        formValues.gender = genderOption;
      }
    }

    // Estado
    if (profileData.city?.state) {
      formValues.state = {
        value: profileData.city.state.id,
        label: profileData.city.state.name,
      };
      setSelectedState(profileData.city.state.id);
    }

    // Foto de perfil
    if (profileData.profile_picture) {
      setAvatarPreview(profileData.profile_picture.src);
    }

    // Campos específicos do psicólogo
    if (userType === "psychologist") {
      formValues.crp = profileData.crp || "";
      formValues.description = profileData.description || "";
      formValues.valuePerAppointment = profileData.value_per_appointment || "";

      if (profileData.specialties && profileData.specialties.length > 0) {
        formValues.specialties = profileData.specialties.map((spec) => ({
          value: spec.id,
          label: spec.name,
        }));
      }

      if (profileData.approaches && profileData.approaches.length > 0) {
        formValues.approaches = profileData.approaches.map((app) => ({
          value: app.id,
          label: app.name,
        }));
      }

      if (profileData.audiences && profileData.audiences.length > 0) {
        formValues.audiences = profileData.audiences.map((aud) => ({
          value: aud,
          label:
            audiencesOptions.find((opt) => opt.value === aud)?.label || aud,
        }));
      }
    }

    // Usar reset para preencher todos os campos de uma vez
    reset(formValues);
  }, [profileData, userType, reset]);

  // Setar cidade depois que as opções de cidades carregarem
  useEffect(() => {
    if (profileData?.city && citiesData && citiesData.length > 0) {
      const cityOption = {
        value: profileData.city.id,
        label: profileData.city.name,
      };
      setValue("city", cityOption);
    }
  }, [profileData, citiesData, setValue]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  async function updateProfile(formData) {
    setLoading(true);
    setUpdateError("");

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

      // Verificar se houve mudanças
      let hasChanges = false;

      // Verificar mudança de avatar
      if (
        avatarFile ||
        (avatarPreview === null && profileData?.profile_picture)
      ) {
        hasChanges = true;
      }

      // Verificar mudanças nos campos básicos
      if (
        formData.name !== profileData?.name ||
        formData.email !== profileData?.email ||
        formData.phone !== profileData?.phone_number ||
        formData.birthDate !==
          (profileData?.birth_date
            ? new Date(profileData.birth_date).toISOString().split("T")[0]
            : "") ||
        normalizeSelect(formData.gender) !== profileData?.gender ||
        normalizeSelect(formData.city) !== profileData?.city?.id
      ) {
        hasChanges = true;
      }

      // Verificar mudanças específicas do psicólogo
      if (userType === "psychologist") {
        const currentSpecialties =
          profileData?.specialties?.map((s) => s.id).sort() || [];
        const newSpecialties = normalizeMulti(formData.specialties).sort();
        const currentApproaches =
          profileData?.approaches?.map((a) => a.id).sort() || [];
        const newApproaches = normalizeMulti(formData.approaches).sort();
        const currentAudiences = profileData?.audiences?.sort() || [];
        const newAudiences = normalizeMulti(formData.audiences).sort();

        if (
          formData.crp !== profileData?.crp ||
          formData.valuePerAppointment !== profileData?.value_per_appointment ||
          (formData.description || "") !== (profileData?.description || "") ||
          JSON.stringify(currentSpecialties) !==
            JSON.stringify(newSpecialties) ||
          JSON.stringify(currentApproaches) !== JSON.stringify(newApproaches) ||
          JSON.stringify(currentAudiences) !== JSON.stringify(newAudiences)
        ) {
          hasChanges = true;
        }
      }

      if (!hasChanges) {
        addToast("Nenhuma alteração detectada.", "info");
        setLoading(false);
        return;
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        birthDate: formData.birthDate,
        gender: normalizeSelect(formData.gender),
        cityId: normalizeSelect(formData.city),
        profilePicture: avatarFile,
        deleteProfilePicture: avatarPreview === null && !avatarFile,
      };

      if (userType === "patient") {
        await updatePatientMutation.mutateAsync(payload);
      } else {
        const psychologistPayload = {
          ...payload,
          crp: formData.crp,
          valuePerAppointment: formData.valuePerAppointment,
          description: formData.description || "",
          specialties: formData.specialties
            ? normalizeMulti(formData.specialties)
            : [],
          approaches: formData.approaches
            ? normalizeMulti(formData.approaches)
            : [],
          audiences: formData.audiences
            ? normalizeMulti(formData.audiences)
            : [],
        };

        await updatePsychologistMutation.mutateAsync(psychologistPayload);
      }

      addToast("Perfil atualizado com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);

      let errorMessage =
        "Erro ao atualizar perfil. Por favor, tente novamente.";

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

      setUpdateError(errorMessage);
      addToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  }

  if (loadingUser || loadingProfile) {
    return (
      <PageContainer>
        <SubHeader text="Editar Perfil" />
        <Container>
          <LoaderBox>
            <LoadingOutlined />
          </LoaderBox>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SubHeader text="Editar Perfil" />
      <Container>
        <FormContainer>
          <Form onSubmit={handleSubmit(updateProfile)} noValidate>
            <AvatarRow>
              <AvatarPreview
                src={avatarPreview || ""}
                alt="Foto de perfil"
                style={{
                  backgroundColor: avatarPreview ? "transparent" : "#f0f0f0",
                  border: avatarPreview ? "none" : "2px dashed #ccc",
                }}
              />
              <AvatarUploadContainer>
                <AvatarLabel htmlFor="avatarUpload">
                  {avatarPreview
                    ? "Alterar foto de perfil"
                    : "Adicionar foto de perfil"}
                </AvatarLabel>
                <AvatarInput
                  id="avatarUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                {avatarPreview && (
                  <TextButton type="button" onClick={handleRemoveAvatar}>
                    Remover foto
                  </TextButton>
                )}
              </AvatarUploadContainer>
            </AvatarRow>

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
                <Input
                  id="cpf"
                  value={profileData?.cpf || ""}
                  disabled
                  style={{ opacity: 0.6, cursor: "not-allowed" }}
                />
              </InputAndLabelBox>
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

                <FullWidthInputContainer>
                  <InputAndLabelBox>
                    <Label htmlFor="description">BIOGRAFIA</Label>
                    <DescriptionTextArea
                      id="description"
                      placeholder="Conte um pouco sobre você e sua experiência profissional..."
                      {...register("description")}
                    />
                  </InputAndLabelBox>
                  {errors.description && (
                    <Message>{errors.description.message}</Message>
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

            <FullMessage>{updateError}</FullMessage>

            {loading ? (
              <LoaderBox>
                <LoadingOutlined />
              </LoaderBox>
            ) : (
              <SubmitButton type="submit" value="Salvar alterações" />
            )}
          </Form>
        </FormContainer>
      </Container>
    </PageContainer>
  );
}

export default EditProfile;
