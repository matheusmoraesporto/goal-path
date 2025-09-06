import { DeveloperLevel } from "@/app/types/user-preferences";
import { redirect } from "next/navigation";
import z from "zod";

export type FormRoadmapState = {
  values?: {
    roadmapName?: string;
    developerLevel?: DeveloperLevel;
    techGoal?: string;
  };
  errors?: {
    roadmapName?: string[];
    developerLevel?: string[];
    techGoal?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  roadmapName: z.string().min(1, "Nome do plano de estudos é obrigatório"),
  developerLevel: z.string().min(1, "O nível como desenvolvedor é obrigatório"),
  techGoal: z
    .string()
    .min(1, "A tecnologia que você pretende estudar é obrigatória"),
});

const CreateRoadmap = FormSchema.omit({ id: true });

export async function createRoadmap(
  prevState: FormRoadmapState,
  formData: FormData
) {
  console.log("Creating roadmap action...");
  console.log(formData.get("developerLevel"));
  console.log(formData.get("techGoal"));

  const validatedFields = CreateRoadmap.safeParse({
    roadmapName: formData.get("roadmapName"),
    developerLevel: formData.get("developerLevel"),
    techGoal: formData.get("techGoal"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: {
        roadmapName: formData.get("roadmapName") as string,
        developerLevel: formData.get("developerLevel") as DeveloperLevel,
        techGoal: formData.get("techGoal") as string,
      },
      message: "Missing Fields. Failed to Create Roadmap.",
    };
  }

  // TODO: Remover isso, e só pra testar
  return {
    // errors: validatedFields.error.flatten().fieldErrors,
    values: {
      roadmapName: formData.get("roadmapName") as string,
      developerLevel: formData.get("developerLevel") as DeveloperLevel,
      techGoal: formData.get("techGoal") as string,
    },
    message: "Missing Fields. Failed to Create Roadmap.",
  };

  // TODO: Chamar a Open API para criar o roadmap
  // TODO: Após receber a resposta dela, então salvar os dados no banco
  // TODO: Então se tudo certo, redirecionar para a página do roadmap criado
  // redirect(`/roadmap/${newRoadmap.id}`);
}
