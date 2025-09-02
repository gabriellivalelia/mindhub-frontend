import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .nonempty("Esse campo é obrigatório!")
    .email("Formato de email inválido!")
    .toLowerCase(),
  password: z
    .string()
    .nonempty("Esse campo é obrigatório!")
    .min(8, "A senha tem no mínimo 8 caracteres!"),
});
