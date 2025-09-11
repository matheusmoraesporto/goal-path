"use client";

import { useEffect, useState } from "react";
import "./styles.css";
import { FaCheckCircle } from "react-icons/fa";
import { RiProgress2Fill } from "react-icons/ri";

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
            backgroundColor: isCompleted ? "#17c52bff" : "#004a5f",
          }}
        >
          {isCompleted ? (
            <FaCheckCircle className="step-progress-icon step-progress-icon-done" />
          ) : (
            <RiProgress2Fill className="step-progress-icon step-progress-icon-progress" />
          )}
        </div>
      </div>
      <div className="step-card-container">
        <h3>{name}</h3>
        <p>Lorem ipsum</p>
      </div>
    </div>
  );
}
