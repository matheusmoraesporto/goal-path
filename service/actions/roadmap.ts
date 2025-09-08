import {
  DeveloperLevel,
  Experience,
  FrequencyMetric,
  Language,
  Metric,
  MetricDuration,
  Payment,
} from "@/app/types/user-preferences";
import { redirect } from "next/navigation";
import z from "zod";

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

  const exp = parseExperiences(formData);
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

  // TODO: Remover isso, e só pra testar
  return {
    errors: {
      roadmapName: ["Erro de teste no nome do roadmap"],
      developerLevel: ["Erro de teste no nome do roadmap"],
      roadmapDurationAmount: ["Erro de teste no nome do roadmap"],
      roadmapDurationMetric: ["Erro de teste no nome do roadmap"],
      studyFrequencyMetric: ["Erro de teste no nome do roadmap"],
      studyFrequencyAmount: ["Erro de teste no nome do roadmap"],
      payment: ["Erro de teste no nome do roadmap"],
      language: ["Erro de teste no nome do roadmap"],
    },
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

  // TODO: Chamar a Open API para criar o roadmap
  // TODO: Após receber a resposta dela, então salvar os dados no banco
  // TODO: Então se tudo certo, redirecionar para a página do roadmap criado
  // redirect(`/roadmap/${newRoadmap.id}`);
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
