export type DeveloperLevel =
  | "beginner"
  | "junior"
  | "intermediate"
  | "advanced";

export type Metric = "years" | "months";

export type FrequencyMetric = "weeks" | "months";

export type Language = "portuguese" | "english" | "both";

export type Payment = "free" | "paid" | "both";

export interface UserPreferences {
  roadmapName: string;
  developerLevel: DeveloperLevel;
  techGoal: string;
  experiences: Experience[];
  roadmapDuration: MetricDuration;
  frequency: Frequency;
  audio: boolean;
  text: boolean;
  document: boolean;
  video: boolean;
  language: Language;
  payment: Payment;
}

export interface Experience {
  tech: string;
  metricDuration: MetricDuration;
}

export interface MetricDuration {
  amount: number;
  metric: Metric;
}

export interface Frequency {
  amount: number;
  metric: FrequencyMetric;
}
