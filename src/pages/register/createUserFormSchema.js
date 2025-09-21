import { z } from "zod";

const passwordSchema = z
  .string()
  .nonempty("A senha é obrigatória!")
  .min(6, "A senha precisa ter no mínimo 6 caracteres!");

const baseUserSchema = {
  name: z
    .string()
    .nonempty("O nome completo é obrigatório!")
    .regex(
      /^[a-zA-ZÀ-ÿ\s]+$/,
      "Digite um nome válido (apenas letras e acentos)."
    )
    .transform((name) =>
      name
        .trim()
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    ),
  birthDate: z.string().nonempty("A data de nascimento é obrigatória!"),
  cpf: z
    .string()
    .nonempty("O CPF é obrigatório!")
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "Formato de CPF inválido. Use XXX.XXX.XXX-XX"
    ),
  phone: z
    .string()
    .nonempty("O telefone é obrigatório!")
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "Formato de telefone inválido. Use (XX) XXXXX-XXXX"
    ),
  address: z.string().nonempty("O endereço é obrigatório!"),
  state: z.string().nonempty("O estado é obrigatório!"),
  email: z
    .string()
    .nonempty("O email é obrigatório!")
    .email("Formato de email inválido!")
    .toLowerCase(),
  confirmedEmail: z.string().nonempty("A confirmação do email é obrigatória!"),
  password: passwordSchema,
  confirmedPassword: passwordSchema,
};

export const CreatePacientFormSchema = z
  .object(baseUserSchema)
  .refine((data) => data.password === data.confirmedPassword, {
    path: ["confirmedPassword"],
    message: "As senhas não coincidem!",
  })
  .refine((data) => data.email === data.confirmedEmail, {
    path: ["confirmedEmail"],
    message: "Os emails não coincidem!",
  });

export const CreatePsychologistFormSchema = z
  .object({
    ...baseUserSchema,
    crp: z
      .string()
      .nonempty("O CRP é obrigatório!")
      .regex(/^\d{2}\/\d{4,6}$/, "Formato de CRP inválido. Use XX/XXXXXX"),
    approach: z.string().nonempty("A abordagem é obrigatória!"),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    path: ["confirmedPassword"],
    message: "As senhas não coincidem!",
  })
  .refine((data) => data.email === data.confirmedEmail, {
    path: ["confirmedEmail"],
    message: "Os emails não coincidem!",
  });
