"use server";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { z } from "zod";

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

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

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
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`
      INSERT INTO users (name, password) VALUES (${name}, ${hashedPassword})`;
  } catch (error) {
    console.log("erro ocorreu:", error);
    return {
      ...prevState,
      message: "Erro ao criar usuário. Tente novamente.",
    };
  }

  console.log("Usuário criado com sucesso");

  redirect("/");
};

export { createUser };
