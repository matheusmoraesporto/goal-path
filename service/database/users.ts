"use server";

import bcrypt from "bcryptjs";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const saveUser = async (name: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`
          INSERT INTO users (name, password) VALUES (${name}, ${hashedPassword})`;
  } catch (error) {
    console.log("erro ocorreu:", error);
    throw new Error("Failed to create user.");
  }
};

export { saveUser };
