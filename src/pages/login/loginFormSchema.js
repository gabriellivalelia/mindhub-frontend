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
    .min(6, "A senha tem no mínimo 6 caracteres!")
    .max(20, "A senha tem no máximo 20 caracteres!"),
});
