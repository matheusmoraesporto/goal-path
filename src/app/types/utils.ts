import { DeveloperLevel, MetricDuration } from "./user-preferences";

const translateDeveloperLevel = (level: DeveloperLevel) => {
  switch (level) {
    case "beginner":
      return "Iniciante";
    case "junior":
      return "Júnior";
    case "intermediate":
      return "Intermediário";
    case "advanced":
      return "Avançado";
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

export { translateDeveloperLevel, translateMetricDuration };
