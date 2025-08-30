export interface Step {
  name: string
  status: string
}

export interface RoadMap {
  id: string
  name: string
  steps: Step[]
}
