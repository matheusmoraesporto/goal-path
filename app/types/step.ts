import { UserPreferences } from "./user-preferences"

export interface Step {
  name: string
  roadmap_id: string
  isCompleted: boolean;
  title: string;
  description: string;
  resourceTitle: string;
  resourceUrl: string;
  sort: number;
}

export interface RoadMap extends UserPreferences {
  id: string
  steps: Step[]
}
