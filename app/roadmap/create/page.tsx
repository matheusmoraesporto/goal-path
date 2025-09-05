"use client";

import { useState } from "react";
import "./styles.css";
import { Experience } from "@/app/types/user-preferences";

export default function Page() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const onClickAddExperience = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Im clicked");

    // TODO: Mudar para pegar os valores dos inputs
    const newExperience: Experience = {
      tech: "React",
      metricDuration: {
        metric: "years",
        amount: 2,
      },
    };
    setExperiences([...experiences, newExperience]);
  };

  return (
    <form className="centered-div">
      <div className="input-form">
        <label>Nome do plano de estudos:</label>
        <input type="text" name="name" />
      </div>

      <div className="input-form">
        <label>Em qual nível você se vê, como desenvolvedor?:</label>
        {/* TODO: Trocar para select */}
        <input type="text" name="name" />
      </div>

      <div className="input-form">
        <label>Qual tecnologia você pretende estudar?</label>
        <input type="text" name="studyGoal" />
      </div>

      <div className="input-form">
        {/* 
          TODO: Aqui mudar para que seja possível adicionar várias tecnologias
          e para cada uma delas, necessário informar:
            - a tecnologia em si. Ex: React
            - tempo de experiência. Ex: dois inputs, um númeor para quantidade e outro para anos ou meses
        */}
        <label>Quais tecnologias você possui experiência?</label>
        {experiences.map(({ tech, metricDuration }, index) => (
          <div key={index} className="experience-container">
            <span>{tech}</span>
            <span>
              {metricDuration.amount} {metricDuration.metric}
            </span>
            <button
              className="btn-remove-xp"
              type="button"
              // TODO: Mover para uma função própria
              onClick={() => {
                const newExperiences = experiences.filter(
                  (_, i) => i !== index
                );
                setExperiences(newExperiences);
              }}
            >
              Remover
            </button>
          </div>
        ))}
        <div className="input-form-aggregator">
          <input type="text" name="studyGoal" />
        </div>
        <button className="btn-add-xp" onClick={onClickAddExperience}>
          Adicionar experiência
        </button>
      </div>

      <div className="input-form">
        <label>
          Qual o tempo total você deseja investir neste plano de estudos?
        </label>
        <div className="input-form-inline-field">
          <input type="number" name="studyGoal" min={1} />
          <input type="text" name="studyGoal" />
        </div>
      </div>

      <div className="input-form">
        {/* TODO: Exemplo: 1 vez por semana */}
        <label>
          Com qual frequência você pretende acessar os conteúdos que serão
          sugeridos?
        </label>
        <div>
          <input type="number" name="studyGoal" min={1} />
          <span> vez(es) por </span>
          {/* TODO: Mudar para um select field */}
          <input type="text" name="studyGoal" />
        </div>
      </div>

      <div className="input-form">
        <label>Quais tipos de conteúdo você prefere para estudar?</label>
        <div>
          <input type="checkbox" name="audio" />
          <label> Áudio</label>
        </div>
        <div>
          <input type="checkbox" name="text" />
          <label> Texto</label>
        </div>
        <div>
          <input type="checkbox" name="doc" />
          <label> Documentações</label>
        </div>
        <div>
          <input type="checkbox" name="video" />
          <label> Vídeos</label>
        </div>
      </div>

      <div className="input-form">
        <label>Você tem preferência por conteúdo pago ou gratuito?</label>
        <div>
          <input type="radio" name="payment" id="free" />
          <label> Gratuito</label>
        </div>
        <div>
          <input type="radio" name="payment" id="paid" />
          <label> Pago</label>
        </div>
        <div>
          <input type="radio" name="payment" id="both" />
          <label> Ambos</label>
        </div>
      </div>

      <div className="input-form">
        <label>
          Você tem preferência por idioma do conteúdo que será sugerido?
        </label>
        <div>
          <input type="radio" name="language" id="english" />
          <label> Inglês</label>
        </div>
        <div>
          <input type="radio" name="language" id="portuguese" />
          <label> Português</label>
        </div>
        <div>
          <input type="radio" name="language" id="both" />
          <label> Ambos</label>
        </div>
      </div>

      <button className="btn-primary" type="submit">
        Create Road Map
      </button>
    </form>
  );
}
