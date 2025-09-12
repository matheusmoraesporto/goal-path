"use server";

import { RoadMap } from "@/app/types/step";
import { UserPreferences } from "@/app/types/user-preferences";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function saveRoadmap(userUUID: string, userPreferences: UserPreferences) {
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

async function getRoadmapsByUser(userUUID: string) {
  try {
    const rows =
      await sql`SELECT id, title FROM roadmaps WHERE user_id=${userUUID}`;
    return rows.map(
      (row) =>
        ({
          id: row.id,
          roadmapName: row.title,
        } as RoadMap)
    );
  } catch (error) {
    console.error("Failed to fetch roadmaps:", error);
    throw new Error("Failed to fetch roadmaps.");
  }
}

async function getRoadmapTitle(roadmapId: string): Promise<string> {
  try {
    const [row] = await sql`SELECT title FROM roadmaps WHERE id=${roadmapId}`;
    return row ? row.title : "Roadmap";
  } catch (error) {
    console.error("Failed to fetch roadmap name:", error);
    throw new Error("Failed to fetch roadmap name.");
  }
}

export { getRoadmapsByUser, getRoadmapTitle, saveRoadmap };
