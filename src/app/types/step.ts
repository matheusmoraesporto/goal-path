import { UserPreferences } from "./user-preferences"

export interface Step {
  name: string
  status: string
}

export interface RoadMap extends UserPreferences {
  id: string
  steps: Step[]
}
