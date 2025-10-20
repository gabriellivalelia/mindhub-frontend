import { z } from "zod";

function isValidCPF(cpf) {
  if (!cpf) return false;
  const onlyDigits = cpf.replace(/\D/g, "");
  if (onlyDigits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(onlyDigits)) return false;

  const calcCheckDigit = (digits) => {
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      sum += parseInt(digits.charAt(i), 10) * (digits.length + 1 - i);
    }
    const rem = (sum * 10) % 11;
    return rem === 10 ? 0 : rem;
  };

  const base = onlyDigits.slice(0, 9);
  const firstCheck = calcCheckDigit(base);
  const secondCheck = calcCheckDigit(base + firstCheck);
  return (
    +onlyDigits.charAt(9) === firstCheck &&
    +onlyDigits.charAt(10) === secondCheck
  );
}

const passwordSchema = z
  .string()
  .nonempty("A senha é obrigatória!")
  .min(6, "A senha precisa ter no mínimo 6 caracteres!")
  .max(20, "A senha pode ter no máximo 20 caracteres!");

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
  birthDate: z.preprocess(
    (v) => (v == null ? "" : v),
    z.string().nonempty("A data de nascimento é obrigatória!")
  ),
  cpf: z.preprocess(
    (v) => (v == null ? "" : v),
    z
      .string()
      .nonempty("O CPF é obrigatório!")
      .regex(
        /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        "Formato de CPF inválido. Use XXX.XXX.XXX-XX"
      )
      .refine((val) => isValidCPF(val), "CPF inválido!")
  ),
  phone: z.preprocess(
    (v) => (v == null ? "" : v),
    z
      .string()
      .nonempty("O telefone é obrigatório!")
      .regex(
        /^\(\d{2}\) \d{5}-\d{4}$/,
        "Formato de telefone inválido. Use (XX) XXXXX-XXXX"
      )
  ),
  gender: z.preprocess((v) => {
    if (v == null) return "";
    if (typeof v === "string") return v;
    if (typeof v === "object") return v.value ?? v.label ?? "";
    return "";
  }, z.string().nonempty("O gênero é obrigatório!")),
  state: z.preprocess((v) => {
    if (v == null) return "";
    if (typeof v === "string") return v;
    if (typeof v === "object") return v.value ?? v.label ?? "";
    return "";
  }, z.string().nonempty("O estado é obrigatório!")),
  city: z.preprocess((v) => {
    if (v == null) return "";
    if (typeof v === "string") return v;
    if (typeof v === "object") return v.value ?? v.label ?? "";
    return "";
  }, z.string().nonempty("A cidade é obrigatória!")),
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
    crp: z.preprocess(
      (v) => (v == null ? "" : v),
      z
        .string()
        .nonempty("O CRP é obrigatório!")
        .regex(/^\d{2}\/\d{4,6}$/, "Formato de CRP inválido. Use 00/000000")
    ),
    valuePerAppointment: z
      .union([z.string(), z.number()])
      .refine((v) => v !== null && v !== undefined && v !== "", {
        message: "O valor por consulta é obrigatório!",
      })
      .transform((v) => {
        const num = typeof v === "string" ? parseFloat(v) : v;
        if (isNaN(num)) {
          throw new Error("Digite um valor numérico válido!");
        }
        return num;
      })
      .refine((v) => v > 0, {
        message: "O valor por consulta deve ser maior que zero!",
      })
      .refine((v) => v >= 0.01, {
        message: "O valor mínimo é R$ 0,01",
      }),
    approaches: z.preprocess(
      (v) => {
        if (v == null) return [];
        if (Array.isArray(v))
          return v.map((item) =>
            typeof item === "object" ? (item.value ?? item.label ?? "") : item
          );
        return [];
      },
      z.array(z.string()).min(1, "Selecione ao menos uma abordagem")
    ),
    specialties: z.preprocess(
      (v) => {
        if (v == null) return [];
        if (Array.isArray(v))
          return v.map((item) =>
            typeof item === "object" ? (item.value ?? item.label ?? "") : item
          );
        return [];
      },
      z.array(z.string()).min(1, "Selecione ao menos uma especialidade")
    ),
    audiences: z.preprocess(
      (v) => {
        if (v == null) return [];
        if (Array.isArray(v))
          return v.map((item) =>
            typeof item === "object" ? (item.value ?? item.label ?? "") : item
          );
        return [];
      },
      z.array(z.string()).min(1, "Selecione ao menos um público-alvo")
    ),
    description: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    path: ["confirmedPassword"],
    message: "As senhas não coincidem!",
  })
  .refine((data) => data.email === data.confirmedEmail, {
    path: ["confirmedEmail"],
    message: "Os emails não coincidem!",
  });
