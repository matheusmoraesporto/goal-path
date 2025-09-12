"use server";

import { Step } from "@/app/types/step";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function saveSteps(roadmapId: number, steps: Step[]) {
  try {
    await Promise.all(
      steps.map(
        ({ title, resourceTitle, resourceUrl, description, sort }) => sql`
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

async function getStepsByRoadmap(roadmapId: string): Promise<Step[]> {
  try {
    const rows = await sql`
      SELECT * FROM steps WHERE roadmap_id = ${roadmapId} ORDER BY sort ASC
    `;
    return rows.map((row) => ({
      id: row.id,
      roadmap_id: row.roadmap_id,
      title: row.title,
      description: row.description,
      resourceTitle: row.resource_title,
      resourceUrl: row.resource_url,
      isCompleted: row.is_completed,
      sort: row.sort,
    }));
  } catch (error) {
    console.error("Failed to fetch steps:", error);
    throw new Error("Failed to fetch steps.");
  }
}

export { getStepsByRoadmap, saveSteps };
