"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { signIn } from "../../auth";
import { AuthError } from "next-auth";
import { saveUser } from "../database/users";

export type FormLoginState = {
  values?: {
    name?: string;
    password?: string;
  };
  error?: string;
};

export type FormUserState = {
  values?: {
    name?: string;
    password?: string;
  };
  errors?: {
    name?: string[];
    password?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nome é obrigatório"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

const CreateUser = FormSchema.omit({ id: true });

const createUser = async (prevState: FormUserState, formData: FormData) => {
  const validatedFields = CreateUser.safeParse({
    name: formData.get("name"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: {
        name: formData.get("name") as string,
        password: formData.get("password") as string,
      },
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { name, password } = validatedFields.data;

  try {
    await saveUser(name, password);
    console.log("Usuário criado com sucesso");
  } catch (error) {
    console.log("Erro ao criar usuário:", error);
    return {
      ...prevState,
      message: "Erro ao criar usuário. Tente novamente.",
    };
  }

  try {
    await authenticateNewUser(name, password);
  } catch (error) {
    console.log("Erro ao autenticar novo usuário:", error);
    return {
      values: { name, password },
      message: "Usuário criado, mas falha ao autenticar.",
    };
  }

  redirect("/");
};

export async function authenticate(
  prevState: FormLoginState | undefined,
  formData: FormData
): Promise<FormLoginState | undefined> {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      const name = formData.get("name") as string;
      const password = formData.get("password") as string;

      switch (error.type) {
        case "CredentialsSignin":
          return {
            values: { name, password },
            error: "Credenciais inválidas.",
          };
        default:
          return {
            values: { name, password },
            error: "Ocorreu um erro.",
          };
      }
    }
    throw error;
  }
}

async function authenticateNewUser(name: string, password: string) {
  try {
    await signIn("credentials", {
      name,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return {
        values: { name, password },
        message: "Credenciais inválidas.",
      };
    }
    return {
      values: { name, password },
      message: "Erro ao autenticar.",
    };
  }
}

export { createUser };
