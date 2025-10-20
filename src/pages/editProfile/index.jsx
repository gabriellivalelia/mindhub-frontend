import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Colors from "../../globalConfigs/globalStyles/colors";

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
  AvatarRow,
  AvatarPreview,
  TextButton,
  DescriptionTextArea,
} from "./styles";

import { SubHeader } from "../../components";
import { genderOptions } from "../register/genderOptions";

const mockUser = {
  name: "João Silva",
  birthDate: "01/01/1990",
  cpf: "000.000.000-00",
  phone: "(11) 99999-9999",
  email: "joao@example.com",
  gender: { value: "male", label: "Masculino" },
  state: { value: "mg", label: "Minas Gerais" },
  city: { value: "bh", label: "Belo Horizonte" },
};

function EditProfile() {
  const [userType, setUserType] = useState("patient");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    // prefill with mock data
    setValue("name", mockUser.name);
    setValue("birthDate", mockUser.birthDate);
    setValue("cpf", mockUser.cpf);
    setValue("phone", mockUser.phone);
    setValue("email", mockUser.email);
    setValue("gender", mockUser.gender);
    setValue("state", mockUser.state);
    setValue("city", mockUser.city);
    // if mock user is psicologist, set userType accordingly (default mock is patient)
    // setValue('userType', 'patient');
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data) => {
    console.log("Edit Profile submit:", data, { avatar });
    // TODO: call API to save changes
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "none",
      boxShadow: "none",
      minHeight: "28px",
      height: "28px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "28px",
      padding: "0.15rem 0",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "28px",
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

  return (
    <PageContainer>
      <SubHeader text="Editar Perfil" />
      <Container>
        <FormContainer>
          <div style={{ width: "100%" }}>
            {/* user type toggle (patient/psychologist) */}
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <button
                type="button"
                onClick={() => setUserType("patient")}
                style={{
                  padding: "8px 12px",
                  background: userType === "patient" ? "#ddd" : "transparent",
                  border: "none",
                  borderRadius: 6,
                }}
              >
                Paciente
              </button>
              <button
                type="button"
                onClick={() => setUserType("psychologist")}
                style={{
                  padding: "8px 12px",
                  background:
                    userType === "psychologist" ? "#ddd" : "transparent",
                  border: "none",
                  borderRadius: 6,
                }}
              >
                Psicólogo
              </button>
            </div>

            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <AvatarRow>
                <AvatarPreview
                  src={avatar || "/src/assets/profile.jpeg"}
                  alt="avatar"
                />
                <div>
                  <label htmlFor="avatarUpload">Alterar foto de perfil</label>
                  <input
                    id="avatarUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </div>
              </AvatarRow>

              <FullWidthInputContainer>
                <InputAndLabelBox>
                  <Label htmlFor="name">NOME COMPLETO</Label>
                  <Input id="name" {...register("name")} />
                </InputAndLabelBox>
              </FullWidthInputContainer>

              <InputContainer>
                <InputAndLabelBox>
                  <Label htmlFor="birthDate">DATA DE NASCIMENTO</Label>
                  <StyledMaskInput
                    id="birthDate"
                    mask="00/00/0000"
                    {...register("birthDate")}
                  />
                </InputAndLabelBox>
              </InputContainer>

              <InputContainer>
                <InputAndLabelBox>
                  <Label htmlFor="cpf">CPF</Label>
                  DescriptionTextArea, FullMessage,
                </InputAndLabelBox>
              </InputContainer>

              <InputContainer>
                <InputAndLabelBox>
                  <Label htmlFor="phone">TELEFONE</Label>
                  <StyledMaskInput
                    id="phone"
                    mask="(00) 00000-0000"
                    {...register("phone")}
                  />
                </InputAndLabelBox>
              </InputContainer>

              <FullWidthInputContainer>
                <InputAndLabelBox>
                  <Label htmlFor="email">E-MAIL</Label>
                  <Input id="email" type="email" {...register("email")} />
                </InputAndLabelBox>
              </FullWidthInputContainer>

              <InputContainer>
                <InputAndLabelBox>
                  <Label htmlFor="gender">GÊNERO</Label>
                  <Select
                    id="gender"
                    {...register("gender")}
                    options={genderOptions}
                    styles={customStyles}
                  />
                </InputAndLabelBox>
              </InputContainer>

              <InputContainer>
                <InputAndLabelBox>
                  <Label htmlFor="state">ESTADO</Label>
                  <Select id="state" {...register("state")} options={[]} />
                </InputAndLabelBox>
              </InputContainer>

              <InputContainer>
                <InputAndLabelBox>
                  <Label htmlFor="city">CIDADE</Label>
                  <Select
                    id="city"
                    {...register("city")}
                    options={cityOptions}
                    styles={customStyles}
                  />
                </InputAndLabelBox>
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
                      />
                    </InputAndLabelBox>
                  </InputContainer>

                  <InputContainer>
                    <InputAndLabelBox>
                      <Label htmlFor="approaches">ABORDAGENS</Label>
                      <Select
                        id="approaches"
                        {...register("approaches")}
                        options={[]}
                        isMulti
                        styles={customStyles}
                      />
                    </InputAndLabelBox>
                  </InputContainer>

                  <FullWidthInputContainer>
                    <InputAndLabelBox>
                      <Label htmlFor="specialties">ESPECIALIDADES</Label>
                      <Select
                        id="specialties"
                        {...register("specialties")}
                        options={[]}
                        isMulti
                        styles={customStyles}
                      />
                    </InputAndLabelBox>
                  </FullWidthInputContainer>

                  <FullWidthInputContainer>
                    <InputAndLabelBox>
                      <Label htmlFor="description">DESCRIÇÃO</Label>
                      <DescriptionTextArea
                        id="description"
                        {...register("description")}
                      />
                    </InputAndLabelBox>
                  </FullWidthInputContainer>
                </>
              )}

              <FullMessage>{errors?.form}</FullMessage>

              <SubmitButton type="submit" value="Salvar alterações" />
            </Form>
          </div>
        </FormContainer>
      </Container>
    </PageContainer>
  );
}

export default EditProfile;
