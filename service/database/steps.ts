"use server";

import { Step } from "@/app/types/step";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function saveSteps(roadmapId: number, steps: Step[]) {
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

export { saveSteps };