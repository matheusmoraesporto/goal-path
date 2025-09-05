"use client";

import { useEffect, useState } from "react";
import "./styles.css";

export default function StepTile({
  name,
  status,
  lastChild,
}: {
  name: string;
  status: string;
  lastChild: boolean;
}) {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    setIsCompleted(status === "completed");
  }, [status]);

  return (
    <div className="step-container">
      <div className="step-timeline">
        <div
          className="line"
          style={{
            height: lastChild ? "100%" : "120%",
            backgroundColor: isCompleted
              ? "rgba(46, 235, 166, 1)"
              : "#004a5f",
          }}
        >
          {/* TODO: Trocar por um ícone */}
          <p
            className="status"
            style={{
              backgroundColor: isCompleted
                ? "rgba(46, 235, 166, 1)"
                : "#004a5f",
            }}
          >
            {isCompleted ? "V" : "..."}
          </p>
        </div>
      </div>
      <div className="step-card-container">
        {/* TODO: Adicionar um ícone de "Em andamento" ou "Completo" */}
        <h3>{name}</h3>
        <p>Lorem ipsum</p>
      </div>
    </div>
  );
}
