import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from 'react-select';

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
  StyledMaskInput,
  SubmitButton,
  AvatarRow,
  AvatarPreview,
  TextButton,
} from "./styles";

import { SubHeader } from "../../components";
import { FontSizes } from "../../globalConfigs";
import { genderOptions } from "../register/genderOptions";
import { stateOptions } from "../register/stateOptions";
import { cityOptions } from "../register/cityOptions";

const mockUser = {
  name: 'João Silva',
  birthDate: '01/01/1990',
  cpf: '000.000.000-00',
  phone: '(11) 99999-9999',
  email: 'joao@example.com',
  gender: { value: 'male', label: 'Masculino' },
  state: { value: 'mg', label: 'Minas Gerais' },
  city: { value: 'bh', label: 'Belo Horizonte' },
};

function EditProfile() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    // prefill with mock data
    setValue('name', mockUser.name);
    setValue('birthDate', mockUser.birthDate);
    setValue('cpf', mockUser.cpf);
    setValue('phone', mockUser.phone);
    setValue('email', mockUser.email);
    setValue('gender', mockUser.gender);
    setValue('state', mockUser.state);
    setValue('city', mockUser.city);
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data) => {
    console.log('Edit Profile submit:', data, { avatar });
    // TODO: call API to save changes
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  };

  return (
    <PageContainer>
      <SubHeader text="Editar Perfil" />
      <Container>
        <FormContainer>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <AvatarRow>
              <AvatarPreview src={avatar || '/src/assets/profile.jpeg'} alt="avatar" />
              <div>
                <label htmlFor="avatarUpload">Alterar foto de perfil</label>
                <input id="avatarUpload" type="file" accept="image/*" onChange={handleAvatarChange} />
              </div>
            </AvatarRow>

            <FullWidthInputContainer>
              <InputAndLabelBox>
                <Label htmlFor="name">NOME COMPLETO</Label>
                <Input id="name" {...register('name')} />
              </InputAndLabelBox>
            </FullWidthInputContainer>

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="birthDate">DATA DE NASCIMENTO</Label>
                <StyledMaskInput id="birthDate" mask="00/00/0000" {...register('birthDate')} />
              </InputAndLabelBox>
            </InputContainer>

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="cpf">CPF</Label>
                <StyledMaskInput id="cpf" mask="000.000.000-00" {...register('cpf')} />
              </InputAndLabelBox>
            </InputContainer>

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="phone">TELEFONE</Label>
                <StyledMaskInput id="phone" mask="(00) 00000-0000" {...register('phone')} />
              </InputAndLabelBox>
            </InputContainer>

            <FullWidthInputContainer>
              <InputAndLabelBox>
                <Label htmlFor="email">E-MAIL</Label>
                <Input id="email" type="email" {...register('email')} />
              </InputAndLabelBox>
            </FullWidthInputContainer>

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="gender">GÊNERO</Label>
                <Select id="gender" {...register('gender')} options={genderOptions} />
              </InputAndLabelBox>
            </InputContainer>

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="state">ESTADO</Label>
                <Select id="state" {...register('state')} options={stateOptions} />
              </InputAndLabelBox>
            </InputContainer>

            <InputContainer>
              <InputAndLabelBox>
                <Label htmlFor="city">CIDADE</Label>
                <Select id="city" {...register('city')} options={cityOptions} />
              </InputAndLabelBox>
            </InputContainer>

            <Message style={{ gridColumn: '1 / -1' }}>{errors?.form}</Message>

            <SubmitButton type="submit" value="Salvar alterações" />
          </Form>
        </FormContainer>
      </Container>
    </PageContainer>
  );
}

export default EditProfile;
