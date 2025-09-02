import {
  Language,
  Payment,
  UserPreferences,
} from "goal-path/app/types/user-preferences";
import {
  translateDeveloperLevel,
  translateMetricDuration,
} from "goal-path/app/types/utils";

const generateUserPreferencesPrompt = (userPreferences: UserPreferences) => {
  const { developerLevel, language, payment, roadmapDuration, studyGoal } =
    userPreferences;
  const translatedDevLevel = translateDeveloperLevel(developerLevel);
  const levelText =
    developerLevel === "beginner"
      ? `um ${translatedDevLevel}, que não possui experiência prévia`
      : `um desenvolvedor nível ${translatedDevLevel}`;
  const experiencesText = handleExperiencesText(userPreferences);
  const contentTypeText = handleContentTypeText(userPreferences);
  const languageText = handleLanguageText(language);
  const paymentText = handlePaymentText(payment);

  return `A sua tarefa é criar um plano de estudos personalizado para ${studyGoal}.
	Considere que este plano de estudos é para ${levelText}, ${experiencesText}.
	Considere que o plano de estudos deve ser projetado para durar aproximadamente ${
    roadmapDuration.amount
  } ${translateMetricDuration(roadmapDuration)}.
	Dê preferência para conteúdos no formato de ${contentTypeText}, ${languageText} e ${paymentText}.`;
};

const handleExperiencesText = (userPreferences: UserPreferences) => {
  const { experiences } = userPreferences;
  return experiences.length
    ? `além disso, o usuário possui as seguintes experiências prévias: ${experiences
        .map(
          (exp) =>
            `${exp.metricDuration.amount} ${translateMetricDuration(
              exp.metricDuration
            )} de experiência com ${exp.tech}`
        )
        .join(", ")}`
    : "além disso, o usuário não possui experiências prévias relevantes";
};

const handleContentTypeText = (userPreferences: UserPreferences) => {
  const contentTypes: string[] = [];
  const { audio, document, text, video } = userPreferences;

  if (video) contentTypes.push("vídeos");
  if (document) contentTypes.push("documentações");
  if (text) contentTypes.push("textos");
  if (audio) contentTypes.push("áudios");

  if (contentTypes.length === 1) return contentTypes[0];
  if (contentTypes.length === 2)
    return `${contentTypes[0]} e ${contentTypes[1]}`;

  const lastType = contentTypes.pop();
  return `${contentTypes.join(", ")} e ${lastType}`;
};

const handleLanguageText = (language: Language) => {
  switch (language) {
    case "portuguese":
      return "no idioma português";
    case "english":
      return "no idioma inglês";
    case "both":
      return "nos idiomas português e inglês";
    default:
      return "em qualquer idioma";
  }
};

const handlePaymentText = (payment: Payment) => {
  switch (payment) {
    case "free":
      return "que sejam gratuitos";
    case "paid":
      return "que possam ser pagos";
    case "both":
      return "podendo ser pagos ou gratuitos";
    default:
      return "";
  }
};

export { generateUserPreferencesPrompt };
