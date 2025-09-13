"use server";

import { revalidateTag } from "next/cache";
import { setStepStatus } from "../database/steps";

const updateStepStatus = async (
  stepId: string,
  roadmapId: string,
  isCompleted: boolean
) => {
  try {
    await setStepStatus(stepId, isCompleted);
  } catch (error) {
    console.error("Failed to toggle step status:", error);
  }

  revalidateTag(`/roadmap/${roadmapId}`);
};

export { updateStepStatus };
