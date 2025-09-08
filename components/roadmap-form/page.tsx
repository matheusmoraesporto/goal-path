"use client";

import { useActionState, useState } from "react";
import "./styles.css";
import {
  Experience,
  Metric,
  MetricDuration,
} from "@/app/types/user-preferences";
import Link from "next/link";
import { createRoadmap, FormRoadmapState } from "@/service/actions/roadmap";
import { developerLevels, frequencyMetrics, metrics } from "./static";
import { BsStars } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

export default function RoadmapForm() {
  const [newTech, setNewTech] = useState("");
  const [newTechAmountDuration, setNewTechAmountDuration] = useState(0);
  const [newTechMetricDuration, setNewTechMetricDuration] = useState<
    MetricDuration | undefined
  >(undefined);

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const initialState: FormRoadmapState = {
    message: null,
    errors: {},
    values: {},
  };
  const [state, formAction, isPending] = useActionState(
    createRoadmap, // TODO: Ignorar o eror por enquanto, quando aidiconar o redirect irá sumir
    initialState
  );

  const onClickAddExperience = () => {
    if (
      !newTech ||
      !newTechAmountDuration ||
      newTechAmountDuration < 1 ||
      !newTechMetricDuration
    ) {
      return;
    }

    const newExperience: Experience = {
      tech: newTech,
      metricDuration: {
        metric: newTechMetricDuration as unknown as Metric,
        amount: newTechAmountDuration,
      },
    };
    setExperiences([...experiences, newExperience]);
  };

  const removeExperience = (index: number) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
  };

  return (
    <form className="new-roadmap-form centered-div" action={formAction}>
      <div className="input-form">
        <label htmlFor="roadmapName">Nome do plano de estudos:</label>
        <input
          id="roadmapName"
          name="roadmapName"
          type="text"
          required
          defaultValue={state?.values?.roadmapName ?? ""}
        />
      </div>

      <div className="input-form">
        <label htmlFor="developerLevel">
          Em qual nível você se vê, como desenvolvedor?
        </label>
        <select
          id="developerLevel"
          name="developerLevel"
          required
          defaultValue={state?.values?.developerLevel ?? ""}
        >
          <option value="" disabled>
            Selecione um nível
          </option>
          {developerLevels.map((devLvl) => (
            <option key={devLvl.id} value={devLvl.id}>
              {devLvl.name}
            </option>
          ))}
        </select>
      </div>

      <div className="input-form">
        <label htmlFor="techGoal">Qual tecnologia você pretende estudar?</label>
        <input
          id="techGoal"
          type="text"
          name="techGoal"
          required
          defaultValue={state?.values?.techGoal ?? ""}
        />
      </div>

      <div className="input-form">
        <label>Quais tecnologias você possui experiência?</label>
        {experiences.map(({ tech, metricDuration }, index) => (
          <div key={index} className="experience-container">
            <span>
              {tech} - {metricDuration.amount} {metricDuration.metric}
            </span>
            <button
              className="btn-secondary"
              type="button"
              onClick={() => removeExperience(index)}
            >
              <FaRegTrashAlt />
            </button>

            {/* Hidden inputs para mandar no submit */}
            <input
              type="hidden"
              name={`experiences[${index}][tech]`}
              value={tech}
            />
            <input
              type="hidden"
              name={`experiences[${index}][amount]`}
              value={metricDuration.amount}
            />
            <input
              type="hidden"
              name={`experiences[${index}][metric]`}
              value={metricDuration.metric}
            />
          </div>
        ))}
        <div className="input-form-aggregator">
          <input
            className="aggregator-item"
            type="text"
            name="tech"
            placeholder="Informe a tecnologia"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
          />
          <input
            className="aggregator-item"
            type="number"
            name="amount"
            placeholder="Informe quanto tempo você tem conhecimento"
            value={newTechAmountDuration}
            onChange={(e) => setNewTechAmountDuration(Number(e.target.value))}
          />
          <select
            className="aggregator-item"
            name="metric"
            value={
              typeof newTechMetricDuration === "string"
                ? newTechMetricDuration
                : newTechMetricDuration
                ? String(newTechMetricDuration)
                : ""
            }
            onChange={(e) =>
              setNewTechMetricDuration(
                e.target.value as unknown as MetricDuration
              )
            }
          >
            <option value="" disabled>
              Selecione um período
            </option>
            {metrics.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          <span className="btn-secondary" onClick={onClickAddExperience}>
            <FiPlus />
            Adicionar
          </span>
        </div>
      </div>

      <div className="input-form">
        <label>
          Qual o tempo total você deseja investir neste plano de estudos?
        </label>
        <div className="input-form-inline-field">
          <input
            id="roadmapDurationAmount"
            type="number"
            name="roadmapDurationAmount"
            min={1}
            defaultValue={state?.values?.roadmapDurationAmount ?? 1}
          />
          <select
            id="roadmapDurationMetric"
            name="roadmapDurationMetric"
            defaultValue={state?.values?.roadmapDurationMetric}
          >
            <option value="" disabled>
              Selecione um período
            </option>
            {metrics.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="input-form">
        <label>
          Com qual frequência você pretende acessar os conteúdos que serão
          sugeridos?
        </label>
        <div>
          <input
            id="studyFrequencyAmount"
            type="number"
            name="studyFrequencyAmount"
            min={1}
            defaultValue={state?.values?.studyFrequencyAmount ?? 1}
          />
          <span> vez(es) por </span>
          <select
            id="studyFrequencyMetric"
            name="studyFrequencyMetric"
            defaultValue={state?.values?.studyFrequencyMetric}
          >
            <option value="" disabled>
              Selecione um período
            </option>
            {frequencyMetrics.map((fm) => (
              <option key={fm.id} value={fm.id}>
                {fm.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="input-form">
        <label>Quais tipos de conteúdo você prefere para estudar?</label>
        <div>
          <input
            id="audio"
            type="checkbox"
            name="audio"
            defaultChecked={state?.values?.audio}
          />
          <label> Áudio</label>
        </div>
        <div>
          <input
            id="text"
            type="checkbox"
            name="text"
            defaultChecked={state?.values?.text}
          />
          <label> Texto</label>
        </div>
        <div>
          <input
            id="document"
            type="checkbox"
            name="document"
            defaultChecked={state?.values?.document}
          />
          <label> Documentações</label>
        </div>
        <div>
          <input
            id="video"
            type="checkbox"
            name="video"
            defaultChecked={state?.values?.video}
          />
          <label> Vídeos</label>
        </div>
      </div>

      <div className="input-form">
        <label>Você tem preferência por conteúdo pago ou gratuito?</label>
        <div>
          <input
            type="radio"
            name="payment"
            id="free"
            value="free"
            defaultChecked={state?.values?.payment === "free"}
          />
          <label> Gratuito</label>
        </div>
        <div>
          <input
            type="radio"
            name="payment"
            id="paid"
            value="paid"
            defaultChecked={state?.values?.payment === "paid"}
          />
          <label> Pago</label>
        </div>
        <div>
          <input
            type="radio"
            name="payment"
            id="both"
            value="both"
            defaultChecked={state?.values?.payment === "both"}
          />
          <label> Ambos</label>
        </div>
      </div>

      <div className="input-form">
        <label>
          Você tem preferência por idioma do conteúdo que será sugerido?
        </label>
        <div>
          <input
            type="radio"
            name="language"
            id="english"
            value="english"
            defaultChecked={state?.values?.language === "english"}
          />
          <label> Inglês</label>
        </div>
        <div>
          <input
            type="radio"
            name="language"
            id="portuguese"
            value="portuguese"
            defaultChecked={state?.values?.language === "portuguese"}
          />
          <label> Português</label>
        </div>
        <div>
          <input
            type="radio"
            name="language"
            id="both"
            value="both"
            defaultChecked={state?.values?.language === "both"}
          />
          <label> Ambos</label>
        </div>
      </div>

      <div className="form-actions">
        <button className="btn-primary" type="submit">
          <BsStars />
          Gerar o plano de estudos
        </button>

        <Link className="btn-secondary" href="/">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
