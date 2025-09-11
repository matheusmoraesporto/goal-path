"use server";

import {
  DeveloperLevel,
  Experience,
  FrequencyMetric,
  Language,
  Metric,
  MetricDuration,
  Payment,
  UserPreferences,
} from "@/app/types/user-preferences";
import { redirect } from "next/navigation";
import postgres from "postgres";
import z from "zod";
import { fetchDataFromOpenAI } from "../openAI/openAI";
import { auth } from "@/auth";
import { Step } from "@/app/types/step";

export type FormRoadmapState = {
  values?: {
    roadmapName?: string;
    developerLevel?: DeveloperLevel;
    techGoal?: string;
    experiences?: Experience[];
    roadmapDurationAmount?: number;
    roadmapDurationMetric?: Metric;
    studyFrequencyAmount?: number;
    studyFrequencyMetric?: FrequencyMetric;
    audio?: boolean;
    text?: boolean;
    document?: boolean;
    video?: boolean;
    payment?: Payment;
    language?: Language;
  };
  errors?: {
    roadmapName?: string[];
    developerLevel?: string[];
    roadmapDurationAmount?: string[];
    roadmapDurationMetric?: string[];
    studyFrequencyAmount?: string[];
    studyFrequencyMetric?: string[];
    payment?: string[];
    language?: string[];
  };
  message?: string | null;
};

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const FormSchema = z.object({
  id: z.string(),
  roadmapName: z.string().min(1, "Nome do plano de estudos é obrigatório"),
  developerLevel: z.string().min(1, "O nível como desenvolvedor é obrigatório"),
  techGoal: z
    .string()
    .min(1, "A tecnologia que você pretende estudar é obrigatória"),
  roadmapDurationAmount: z
    .number()
    .min(1, "A duração do plano de estudos deve ser informada."),
  roadmapDurationMetric: z.enum(["years", "months"], {
    required_error:
      "A métrica de duração do plano de estudos deve ser informada.",
  }),
  studyFrequencyAmount: z
    .number()
    .min(1, "O tempo de estudo deve ser informado."),
  studyFrequencyMetric: z.enum(["weeks", "months"], {
    required_error: "A métrica de tempo de estudo deve ser informada.",
  }),
  video: z.boolean().optional(),
  audio: z.boolean().optional(),
  text: z.boolean().optional(),
  document: z.boolean().optional(),
  payment: z.enum(["free", "paid", "both"], {
    required_error:
      "A preferência por conteúdo pago ou gratuito é obrigatória.",
  }),
  language: z.enum(["portuguese", "english", "both"], {
    required_error: "A preferência por idioma é obrigatória.",
  }),
});

const CreateRoadmap = FormSchema.omit({ id: true });

export async function createRoadmap(
  prevState: FormRoadmapState,
  formData: FormData
) {
  // TODO: Remover esse log
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const session = await auth();
  console.log("Authenticated user:", session?.user);

  const exp: Experience[] = parseExperiences(formData);
  console.log("Parsed Experiences:", exp);

  const validatedFields = CreateRoadmap.safeParse({
    roadmapName: formData.get("roadmapName"),
    developerLevel: formData.get("developerLevel"),
    techGoal: formData.get("techGoal"),
    roadmapDurationAmount: formData.get("roadmapDurationAmount")
      ? Number(formData.get("roadmapDurationAmount"))
      : undefined,
    roadmapDurationMetric: formData.get("roadmapDurationMetric"),
    studyFrequencyAmount: formData.get("studyFrequencyAmount")
      ? Number(formData.get("studyFrequencyAmount"))
      : undefined,
    studyFrequencyMetric: formData.get("studyFrequencyMetric"),
    video: formData.get("video") === "on",
    audio: formData.get("audio") === "on",
    text: formData.get("text") === "on",
    document: formData.get("document") === "on",
    payment: formData.get("payment"),
    language: formData.get("language"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: {
        roadmapName: formData.get("roadmapName") as string,
        developerLevel: formData.get("developerLevel") as DeveloperLevel,
        techGoal: formData.get("techGoal") as string,
        experiences: formData.getAll("experiences") as unknown as Experience[],
        roadmapDurationAmount: formData.get(
          "roadmapDurationAmount"
        ) as unknown as number,
        roadmapDurationMetric: formData.get("roadmapDurationMetric") as Metric,
        studyFrequencyAmount: formData.get(
          "studyFrequencyAmount"
        ) as unknown as number,
        studyFrequencyMetric: formData.get(
          "studyFrequencyMetric"
        ) as FrequencyMetric,
        video: formData.get("video") === "on",
        audio: formData.get("audio") === "on",
        text: formData.get("text") === "on",
        document: formData.get("document") === "on",
        payment: formData.get("payment") as Payment,
        language: formData.get("language") as Language,
      },
      message: "Missing Fields. Failed to Create Roadmap.",
    };
  }

  try {
    const userPreferences: UserPreferences = {
      roadmapName: validatedFields.data.roadmapName,
      developerLevel: validatedFields.data.developerLevel as DeveloperLevel,
      techGoal: validatedFields.data.techGoal,
      experiences: exp,
      roadmapDuration: {
        amount: validatedFields.data.roadmapDurationAmount,
        metric: validatedFields.data.roadmapDurationMetric,
      },
      frequency: {
        amount: validatedFields.data.studyFrequencyAmount,
        metric: validatedFields.data.studyFrequencyMetric,
      },
      audio: validatedFields.data.audio ?? false,
      text: validatedFields.data.text ?? false,
      document: validatedFields.data.document ?? false,
      video: validatedFields.data.video ?? false,
      payment: validatedFields.data.payment,
      language: validatedFields.data.language,
    };

    const steps = await generateStepsFromAI(userPreferences);
    const session = await auth();
    const userUUID = session?.user?.id;
    const newRoadmapId = await saveRoadmapOnDB(userUUID!, userPreferences);
    await saveStepsOnDB(newRoadmapId, steps);

    // TODO: Investigar pq está dando erro no redirect
    redirect(`/roadmap/${newRoadmapId}`);
  } catch (error) {
    console.log("erro ocorreu:", error);
    return {
      ...prevState,
      message: "Erro ao criar plano de estudos. Tente novamente.",
    };
  }
}

async function saveRoadmapOnDB(
  userUUID: string,
  userPreferences: UserPreferences
) {
  const {
    roadmapName,
    developerLevel,
    techGoal,
    roadmapDuration: {
      amount: roadmapDurationAmount,
      metric: roadmapDurationMetric,
    },
    frequency: { amount: studyFrequencyAmount, metric: studyFrequencyMetric },
    audio,
    text,
    document,
    video,
    payment,
    language,
  } = userPreferences;

  try {
    const [createdRoadmap] =
      await sql`INSERT INTO roadmaps (user_id, title, developer_level, tech_goal, duration_amount, duration_metric, frequency_amount, frequency_metric, audio_content, text_content, document_content, video_content, payment, language)
      VALUES (${userUUID}, ${roadmapName}, ${developerLevel}, ${techGoal}, ${roadmapDurationAmount}, ${roadmapDurationMetric}, ${studyFrequencyAmount}, ${studyFrequencyMetric}, ${
        audio ?? false
      }, ${text ?? false}, ${document ?? false}, ${
        video ?? false
      }, ${payment}, ${language}) RETURNING id`;

    return createdRoadmap.id;
  } catch (error) {
    console.error("Failed to save roadmap:", error);
    throw new Error("Failed to save roadmap.");
  }
}

async function saveStepsOnDB(roadmapId: number, steps: Step[]) {
  try {
    await Promise.all(
      steps.map(
        ({
          title,
          resourceTitle,
          resourceUrl,
          description,
          sort,
        }) => sql`
        INSERT INTO steps (roadmap_id, title, resource_title, resource_url, description, is_completed, sort)
        VALUES (${roadmapId}, ${title}, ${resourceTitle}, ${resourceUrl}, ${description}, ${false}, ${sort})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );
  } catch (error) {
    console.error("Failed to save steps:", error);
    throw new Error("Failed to save steps.");
  }
}

async function generateStepsFromAI(
  userPreferences: UserPreferences
): Promise<Step[]> {
  const jsonResp = await fetchDataFromOpenAI(userPreferences);
  const steps: Step[] = JSON.parse(jsonResp);
  return steps;
}

function parseExperiences(formData: FormData): Experience[] {
  const experiences: Record<string, Partial<Experience>> = {};

  for (const [key, value] of formData.entries()) {
    const match = key.match(/^experiences\[(\d+)\]\[(\w+)\]$/);
    if (match) {
      const [, index, field] = match;
      if (!experiences[index])
        experiences[index] = {
          metricDuration: {
            amount: 0,
            metric: "years",
          },
        };
      if (field === "tech") {
        experiences[index].tech = value.toString();
      } else if (field === "amount") {
        (experiences[index].metricDuration as MetricDuration).amount =
          Number(value);
      } else if (field === "metric") {
        (experiences[index].metricDuration as MetricDuration).metric =
          value.toString() as Metric;
      }
    }
  }

  return Object.values(experiences) as Experience[];
}
