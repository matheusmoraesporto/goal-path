import { DeveloperLevel, Frequency, MetricDuration } from "./user-preferences";

const translateDeveloperLevel = (level: DeveloperLevel) => {
  switch (level) {
    case "beginner":
      return "Iniciante";
    case "junior":
      return "Júnior";
    case "intermediate":
      return "Pleno";
    case "senior":
      return "Sênior";
    default:
      return level;
  }
};

const translateMetricDuration = (metricDuration: MetricDuration) => {
  const { amount, metric } = metricDuration;

  switch (metric) {
    case "years":
      return amount > 1 ? "anos" : "ano";
    case "months":
      return amount > 1 ? "meses" : "mês";
    default:
      return metric;
  }
};

const translateFrequencyMetricDuration = (frequency: Frequency) => {
  const { amount, metric } = frequency;

  switch (metric) {
    case "weeks":
      return amount > 1 ? "semanas" : "semana";
    case "months":
      return amount > 1 ? "meses" : "mês";
    default:
      return metric;
  }
};

export {
  translateDeveloperLevel,
  translateFrequencyMetricDuration,
  translateMetricDuration,
};
